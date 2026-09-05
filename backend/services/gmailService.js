import { google } from "googleapis";
import getGoogleAuthClient from "../services/authService.js";


// Recursively find the email body
const getEmailBody = (part) => {

    // Prefer plain text
    if (
        part.mimeType === "text/plain" &&
        part.body?.data
    ) {
        return Buffer
            .from(part.body.data, "base64url")
            .toString("utf-8");
    }

    if (part.parts) {

        for (const childPart of part.parts) {

            const body = getEmailBody(childPart);

            if (body) {
                return body;
            }
        }
    }

    return "";
};

const getHtmlBody = (part) => {

    if (
        part.mimeType === "text/html" &&
        part.body?.data
    ) {
        return Buffer
            .from(part.body.data, "base64url")
            .toString("utf-8");
    }

    if (part.parts) {

        for (const childPart of part.parts) {

            const body = getHtmlBody(childPart);

            if (body) {
                return body;
            }
        }
    }

    return "";
};

const cleanEmailBody = (body) => {

    return body

        // Remove CSS
        .replace(
            /<style[\s\S]*?<\/style>/gi,
            " "
        )

        // Remove JavaScript
        .replace(
            /<script[\s\S]*?<\/script>/gi,
            " "
        )

        // Preserve line breaks
        .replace(
            /<br\s*\/?>/gi,
            "\n"
        )

        // Preserve paragraphs
        .replace(
            /<\/p>/gi,
            "\n"
        )

        // Preserve div separation
        .replace(
            /<\/div>/gi,
            "\n"
        )

        // Remove remaining HTML tags
        .replace(
            /<[^>]*>/g,
            " "
        )

        // Remove numeric HTML entities
        .replace(
            /&#\d+;/g,
            " "
        )

        // Remove named HTML entities
        .replace(
            /&[a-zA-Z]+;/g,
            " "
        )

        // Remove carriage returns
        .replace(
            /\r/g,
            ""
        )

        // Remove unnecessary spaces/tabs
        .replace(
            /[ \t]+/g,
            " "
        )

        // Prevent excessive blank lines
        .replace(
            /\n\s*\n+/g,
            "\n\n"
        )

        .trim();
};


const fetchInboxEmails = async (userId, lastCheckedAt) => {

    const { authclient } =
        await getGoogleAuthClient(userId);

    const gmail = google.gmail({
        auth: authclient,
        version: "v1"
    });

    let query = "";

    if (lastCheckedAt) {
        const date = Math.floor(
            new Date(lastCheckedAt).getTime() / 1000
        );

        query = `after:${date}`;
    }
    const result =
        await gmail.users.messages.list({
            userId: "me",
            maxResults: 20,
            labelIds: ["INBOX"],
            q: query
        });

    const messages =
        result.data.messages || [];

    const emails = [];

    for (const msg of messages) {

        const response =
            await gmail.users.messages.get({

                userId: "me",

                id: msg.id
            });

        const payload =
            response.data.payload;

        const headers =
            payload.headers || [];

        const attachments = [];
        const collectAttachments = (part) => {
            if (
                part.filename &&
                part.body?.attachmentId
            ) {
                attachments.push({
                    filename: part.filename,
                    mimeType: part.mimeType,
                    size: part.body.size,
                    attachmentId: part.body.attachmentId
                });
            }
            if (part.parts) {
                for (const childPart of part.parts) {
                    collectAttachments(childPart);
                }
            }
        };

        collectAttachments(payload);

        let body = "";
        if (payload.body?.data) {

            body =
                Buffer
                    .from(
                        payload.body.data,
                        "base64url"
                    )
                    .toString("utf-8");

        }
        else if (payload.parts) {
            body =
                getEmailBody(payload);
            if (!body) {

                body =
                    getHtmlBody(payload);
            }
        }

        const cleanBody =
            cleanEmailBody(body);

        const email = {

            id: response.data.id,
            threadId: response.data.threadId,
            from: headers.find(
                header =>
                    header.name.toLowerCase() === "from"
            )?.value,
            to: headers.find(
                header =>
                    header.name.toLowerCase() === "to"
            )?.value,
            subject: headers.find(
                header =>
                    header.name.toLowerCase() === "subject"
            )?.value,
            date: headers.find(
                header =>
                    header.name.toLowerCase() === "date"
            )?.value,
            snippet: response.data.snippet,
            body: cleanBody,
            labelIds:
                response.data.labelIds || [],


            attachments: attachments
        };


        emails.push(email);
       
        

    }


    return emails;
};


export default fetchInboxEmails;