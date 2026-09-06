import prisma from "../config/dbCongfig.js";

const emailFilterService = async (
    emails,
    processedEmails,
    userId
) => {

    const preference = await prisma.userPreference.findMany({
        where: {
            userId: userId
        }
    });


    const preferredKeywords = new Set(
        preference.map(pref =>
            pref.userPreferedKeyword.toLowerCase()
        )
    );


    console.log("Preferred keywords:", preferredKeywords);


    // Get THIS user's keyword stats
    const keywordStats = await prisma.keywordStat.findMany({
        where: {
            userId: userId
        }
    });


    const statsMap = new Map();

    for (const stat of keywordStats) {
        statsMap.set(
            stat.keyword.toLowerCase(),
            stat
        );
    }


    // console.log("Stats map:", statsMap);
    

    const relevantEmails = [];


    for (const processedEmail of processedEmails) {

        let score = 0;


        const keywords = [
            ...new Set(processedEmail.keywords)
        ];


        for (const keyword of keywords) {

            const normalizedKeyword =
                keyword.toLowerCase();


            // USER PREFERENCE
            if (preferredKeywords.has(normalizedKeyword)) {

                // console.log(
                //     "Preferred keyword found:",
                //     normalizedKeyword
                // );

                score += 10;
            }


            // KEYWORD BEHAVIOUR
            const stat = statsMap.get(
                normalizedKeyword
            );


            if (stat) {

                // console.log(
                //     "Stat found:",
                //     stat
                // )

                score += stat.read * 2;

                score -= stat.ignored * 2;

                score += stat.replied * 5;
            }
        }


        // Find original email
        const originalEmail = emails.find(
            email =>
                email.id === processedEmail.emailId
        );


        // console.log(
        //     "Email:",
        //     originalEmail?.subject
        // );

        // console.log(
        //     "Score:",
        //     score
        // );


        if (score >= 10 && originalEmail) {

            relevantEmails.push({
                ...originalEmail,
                score
            });
        }
    }


    relevantEmails.sort(
        (a, b) => b.score - a.score
    );

//     const third = Math.ceil(relevantEmails.length / 3);

// const high = relevantEmails.slice(0, third);

// const medium = relevantEmails.slice(third, third * 2);

// const low = relevantEmails.slice(third * 2);
// console.log("high",high);
// console.log("low",low);
// console.log("medium",medium);



    // console.log(
    //     "Relevant emails:",
    //     relevantEmails
    // );

return relevantEmails;
    // return {high,medium,low};
};


export default emailFilterService;