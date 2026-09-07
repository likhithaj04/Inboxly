import prisma from "../config/dbCongfig.js";
import NodeCache from "node-cache";

const tempCache = new NodeCache({ stdTTL: 1200 }); // 20 minutes

const getTempMail = async (userId) => {
  try {
    const cacheKey = `temporaryEmail:${userId}`;

    // Check cache
    const cachedEmails = tempCache.get(cacheKey);

    if (cachedEmails) {
      console.log("Returning temporary emails from cache");
      return cachedEmails;
    }

    // Cache miss → DB
    console.log("Fetching temporary emails from database");

    const tempMail = await prisma.temporaryEmail.findMany({
      where: {
        userId: userId
      }
    });

    console.log("Mail fetched from database");

    // Store in cache
    tempCache.set(cacheKey, tempMail);

    return tempMail;

  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getTempMail;