import Router from 'express'
const router = Router()
import authMiddleware from "../Middleware/authMiddleware.js"
import prisma from '../config/dbCongfig.js'
import retrieveKeywordStat from '../services/keywordStatService.js'
import updateKeywordStats from '../services/keywordUpdateService.js'
import getSummary from '../services/summaryService.js'
import getTempMail from '../services/retrieveTempService.js'
import { summaryLimiter } from '../Middleware/rateLimitter.js'


router.post("/savemail", authMiddleware, async (req, res) => {
    try {
        console.log("hit");

        const userId = req.user.userId
        const {
            id,
            threadId,
            from,
            to,
            subject,
            body,
            date,
            score
        } = req.body;

        const data = await prisma.savedEmails.create({
            data: {
                userId: userId,
                gmailId: id,
                threadId: threadId,
                from: from,
                to: to,
                subject: subject,
                body: body,
                emailDate: new Date(date),
                score: score,
                isImportant: true
            }
        })
        console.log(data);
        const keywords = retrieveKeywordStat(
            data.subject,
            data.body
        );

        await updateKeywordStats(
            keywords,
            userId,
            "important"
        );

        res.status(200).json({ message: "Successfully added" })

    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Failed to save data" })

    }
})

///save mails from temporary section
router.post("/saveTempMail", authMiddleware, async (req, res) => {

    try {

        console.log("save email hit");

        const userId = req.user.userId;

        const {
            gmailId,
            threadId,
            from,
            to,
            subject,
            body,
            date,
            score
        } = req.body;


        // 1. Save email permanently
        const data = await prisma.savedEmails.create({

            data: {
                userId,
                gmailId: gmailId,
                threadId,
                from,
                to,
                subject,
                body,
                emailDate: date,
                score,
                isImportant: true
            }
        });



        // 2. Remove it from temporary emails
        await prisma.temporaryEmail.delete({

            where: {
                userId_gmailId: {
                    userId,
                    gmailId: gmailId
                }
            }
        });


        // 3. Update behavioral statistics
        const keywords = retrieveKeywordStat(
            data.subject,
            data.body
        );

        await updateKeywordStats(
            keywords,
            userId,
            "important"
        );


        res.status(200).json({
            message: "Email saved as important"
        });


    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to save email"
        });
    }
});

//retreive all mails
router.get("/getemail", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const savedMails = await prisma.savedEmails.findMany({
            where: {
                userId: userId
            }
        })
        res.status(200).json({ message: "Successfully fetched", data: savedMails })
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Failed to fetch data" })

    }
})


//get temporary email
router.get("/tempMail", authMiddleware, async (req, res) => {
try {
    const userId = req.user.userId;

    const tempMail = await getTempMail(userId);

    res.status(200).json({
      message: "Successfully fetched",
      data: tempMail
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch data"
    });
  }
})

router.delete("/deletemail/:gmailId", authMiddleware, async (req, res) => {
    const { gmailId } = req.params;
    const userid = req.user.userId;
    console.log(gmailId);

    console.log(" delete mail hit");

    try {
        const deleted = await prisma.savedEmails.delete({
            where: {
                userId_gmailId: {
                    userId: userid,
                    gmailId: gmailId
                }
            }
        })
        console.log("Deleted:");

        res.status(200).json({
            message: "Email deleted successfully",
            deleted
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to delete data"
        });
    }
})
export default router;

router.post("/summary", summaryLimiter, authMiddleware, async (req, res) => {
    const userid = req.user.userId
    const { subject, body, emailid } = req.body;
    console.log(userid, subject);

    const summary = await getSummary(emailid, subject, body)
    return res.status(201).json({ message: "Summary provided", data: summary, emailid })
    console.log(summary);

})