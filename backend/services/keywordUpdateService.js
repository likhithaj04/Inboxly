import prisma from "../config/dbCongfig.js";

const updateKeywordStats = async (processedEmails, userId, action = null) => {

    console.log("updateKeywordStats hit");

    if (!Array.isArray(processedEmails)) {
        processedEmails = [processedEmails];
    }

    const userPreferences = await prisma.userPreference.findMany({
        where: {
            userId
        },
        select: {
            userPreferedKeyword: true
        }
    });

    const preferredKeywords = new Set(
        userPreferences.map(
            preference =>
                preference.userPreferedKeyword.toLowerCase()
        )
    );

    const keywordStats = new Map();

    for (const email of processedEmails) {

        const labels = email.labelIds || [];
        const isRead = !labels.includes("UNREAD");

        const uniqueKeywords = [...new Set(email.keywords)];

        // console.log("Email:", email.emailId);
        // console.log("Keywords:", uniqueKeywords);
        // console.log("Read:", isRead);

        for (const keyword of uniqueKeywords) {

            if (!keywordStats.has(keyword)) {
                keywordStats.set(keyword, {
                    occurrences: 0,
                    read: 0,
                    unread: 0,
                    important: 0,
                    ignored: 0
                });
            }

            const stat = keywordStats.get(keyword);

            stat.occurrences += 1;

            if (isRead) {
                stat.read += 1;
            } else {
                stat.unread += 1;
            }

            if (action === "important") {
                stat.important += 1;
            }

            if (action === "ignored") {
                stat.ignored += 1;
            }
        }
    }

    for (const [keyword, stat] of keywordStats) {

        const isPreferred = preferredKeywords.has(
            keyword.toLowerCase()
        );

        // Save if repeated OR user prefers it
        if (stat.occurrences < 2 && !isPreferred) {
            continue;
        }

        await prisma.keywordStat.upsert({

            where: {
                userId_keyword: {
                    userId,
                    keyword
                }
            },

            create: {
                userId,
                keyword,
                occurrences: stat.occurrences,
                read: stat.read,
                unread: stat.unread,
                important: stat.important,
                ignored: stat.ignored,
                replied: 0
            },

            update: {
                occurrences: {
                    increment: stat.occurrences
                },

                read: {
                    increment: stat.read
                },

                unread: {
                    increment: stat.unread
                },

                important: {
                    increment: stat.important
                },

                ignored: {
                    increment: stat.ignored
                }
            }
        });
    }

    console.log("Successfully passed keyword stats");

    return keywordStats;
};

export default updateKeywordStats;