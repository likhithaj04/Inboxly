import prisma from "../config/dbCongfig.js";

const addTemp = async (emails, userId) => {

    await Promise.all(
        emails.map((email) =>
            prisma.temporaryEmail.upsert({

                where: {
                    userId_gmailId: {
                        userId,
                        gmailId: email.id
                    }
                },

                create: {
                    userId,
                    gmailId: email.id,
                    threadId: email.threadId,
                    to: email.to,
                    from: email.from,
                    subject: email.subject,
                    snippet: email.snippet,
                    body: email.body,
                    priority: email.priority,
                    score: email.score,
                    emailDate: new Date(email.date),
                     expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    )
                },

                update: {
                    priority: email.priority,
                    score: email.score
                }
            })
        )
    );
};



export default addTemp;