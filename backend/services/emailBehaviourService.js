import fetchInboxEmails from "./gmailService.js";
import retrieveKeywordStat from "./keywordStatService.js";
import updateKeywordStats from "./keywordUpdateService.js";
import getEmailSync from './emailSyncService.js'
import emailFilterService from "./emailFilterService.js";
import prisma from "../config/dbCongfig.js";
import emailcache from "./emailCache.js";
import addTemp from "./addTempEmails.js";

const analyzeEmails = async (userId) => {
    // 1. Get sync information
    const emailSync = await getEmailSync(userId);


console.log("USER ID:", userId);
console.log("CACHE KEYS:", emailcache.keys());

const cachedData = emailcache.get(userId);

// console.log("CACHED DATA:", cachedData);

if (cachedData) {
    console.log("✅ Returning from cache");
    return cachedData;
}

console.log(" Cache miss - fetching Gmail");
        console.log("Last checked:", emailSync.lastCheckedAt);

    // 2. Fetch emails
    const emails = await fetchInboxEmails(
        userId,
        emailSync.lastCheckedAt
    );

    console.log("New emails:", emails.length);


    // No new emails
    if (emails.length === 0) {
          return {
            message: "No new emails",
            count: 0
        };
    }


    // 3. Extract meaningful keywords
    const processedEmails = retrieveKeywordStat(emails);


    // 4. Update keyword statistics
    await updateKeywordStats(
        processedEmails,
        userId
    );


    // 5. ONLY update after everything succeeds
    await prisma.emailSync.update({
        where: {
            userId
        },

        data: {
            lastCheckedAt: new Date()
        }
    });

  const filteredEmail=await emailFilterService(emails,processedEmails,userId);
const addTempMail=await addTemp(filteredEmail,userId);

    emailcache.set(
        userId,
        filteredEmail
    );

    return {
                message: "Filtered Email",
        emails: filteredEmail
    };
    
};

export default analyzeEmails


//    const processedEmails = retrieveKeywordStat(emails);  the problem here is with new emails:0 .the function processedemail isnt  executing.....maybe because email[] length is 0??because already processing of email....... for this testing ill clear db data and ca work with this.... 