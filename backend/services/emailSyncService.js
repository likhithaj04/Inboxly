import prisma from "../config/dbCongfig.js";

const getEmailSync = async (userId) => {

    let emailSync = await prisma.emailSync.findUnique({
        where: {
            userId
        }
    });

    if (!emailSync) {

        emailSync = await prisma.emailSync.create({
            data: {
                userId,
                lastCheckedAt: null
            }
        });
    }

    return emailSync;
};

export default getEmailSync