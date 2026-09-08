import prisma from "./config/dbCongfig.js";

async function postDemoEmail() {
    try {

        const demoUser = await prisma.user.findUnique({
            where: {
                email: " demo@example.com"
            }
        })

        console.log(demoUser);

        await prisma.demoEmail.createMany({
            data: [
                {
                    userId: demoUser.id,

                    gmailId: "demo-email-001",
                    threadId: "demo-thread-001",
                    from: "sarah.hr@techcorp.com",
                    to: "demo@example.com",
                    subject: "Interview Invitation - Software Engineer",
                    snippet:
                        "We are pleased to invite you for the next round of the Software Engineer interview process.",
                    body:
                        "Hi Demo User,\n\nWe are pleased to invite you for the next round of the Software Engineer interview process.\n\nYour technical interview is scheduled for September 12 at 11:00 AM.\n\nPlease confirm your availability.\n\nRegards,\nSarah\nTechCorp",
                    score: 96,
                    priority: "HIGH",
                    date: new Date("2026-09-08T09:30:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-002",
                    threadId: "demo-thread-002",
                    from: "careers@startupxyz.com",
                    to: "demo@example.com",
                    subject: "Software Engineer Job Opportunity",
                    snippet:
                        "We came across your profile and would like to discuss an open Software Engineer position.",
                    body:
                        "Hello,\n\nWe came across your profile and believe you may be a good fit for our Software Engineer position.\n\nWe would love to discuss the opportunity with you. Please let us know if you are interested.\n\nBest,\nRecruitment Team",
                    score: 91,
                    priority: "HIGH",
                    date: new Date("2026-09-07T16:20:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-003",
                    threadId: "demo-thread-003",
                    from: "notifications@github.com",
                    to: "demo@example.com",
                    subject: "Your GitHub repository received a new pull request",
                    snippet:
                        "A new pull request has been opened on your repository.",
                    body:
                        "A new pull request has been opened on your repository.\n\nPlease review the changes and provide feedback.",
                    score: 78,
                    priority: "MEDIUM",
                    date: new Date("2026-09-07T13:15:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-004",
                    threadId: "demo-thread-004",
                    from: "linkedin@linkedin.com",
                    to: "demo@example.com",
                    subject: "You have 5 new profile views",
                    snippet:
                        "Your profile appeared in searches and received 5 new views.",
                    body:
                        "Your LinkedIn profile received 5 new profile views this week.\n\nSee who is discovering your profile and explore relevant opportunities.",
                    score: 67,
                    priority: "MEDIUM",
                    date: new Date("2026-09-07T10:00:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-005",
                    threadId: "demo-thread-005",
                    from: "hr@productcompany.com",
                    to: "demo@example.com",
                    subject: "Action Required: Submit coding assignment",
                    snippet:
                        "Please submit your coding assignment before September 10.",
                    body:
                        "Hi,\n\nAs part of our recruitment process, please complete and submit the coding assignment before September 10, 2026.\n\nThe submission deadline is strict.\n\nRegards,\nHiring Team",
                    score: 94,
                    priority: "HIGH",
                    date: new Date("2026-09-06T15:45:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-006",
                    threadId: "demo-thread-006",
                    from: "amazon@example.com",
                    to: "demo@example.com",
                    subject: "Your order has been shipped",
                    snippet: "Your recent order is on its way.",
                    body:
                        "Your order has been shipped and is currently on its way.\n\nYou can track your delivery using your order details.",
                    score: 42,
                    priority: "LOW",
                    date: new Date("2026-09-06T11:30:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-007",
                    threadId: "demo-thread-007",
                    from: "newsletter@devweekly.example",
                    to: "demo@example.com",
                    subject: "Dev Weekly - JavaScript, React and AI",
                    snippet:
                        "Here are this week's top development articles.",
                    body:
                        "Welcome to this week's developer newsletter.\n\nHere are the latest articles covering JavaScript, React, artificial intelligence and web development.",
                    score: 31,
                    priority: "LOW",
                    date: new Date("2026-09-05T08:00:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-008",
                    threadId: "demo-thread-008",
                    from: "events@techcommunity.example",
                    to: "demo@example.com",
                    subject: "You are invited to React Bangalore Meetup",
                    snippet:
                        "Join developers from the community for our upcoming meetup.",
                    body:
                        "You are invited to the upcoming React Bangalore developer meetup.\n\nThe event will include talks about React, Node.js and modern web development.",
                    score: 63,
                    priority: "MEDIUM",
                    date: new Date("2026-09-04T17:00:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-009",
                    threadId: "demo-thread-009",
                    from: "finance@company.example",
                    to: "demo@example.com",
                    subject: "Monthly salary statement available",
                    snippet:
                        "Your salary statement for August is now available.",
                    body:
                        "Your monthly salary statement for August 2026 is now available in the employee portal.",
                    score: 55,
                    priority: "MEDIUM",
                    date: new Date("2026-09-04T12:00:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-010",
                    threadId: "demo-thread-010",
                    from: "product@saascompany.example",
                    to: "demo@example.com",
                    subject: "New features coming to our platform",
                    snippet:
                        "We are introducing several improvements to the platform.",
                    body:
                        "We are excited to announce several improvements to our platform, including a redesigned dashboard, faster search and new automation features.",
                    score: 48,
                    priority: "LOW",
                    date: new Date("2026-09-03T14:30:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-011",
                    threadId: "demo-thread-011",
                    from: "manager@techcorp.example",
                    to: "demo@example.com",
                    subject: "Project meeting moved to tomorrow",
                    snippet:
                        "Tomorrow's project meeting has been moved to 10 AM.",
                    body:
                        "Hi,\n\nTomorrow's project meeting has been moved from 2 PM to 10 AM.\n\nPlease make sure you are available.\n\nThanks.",
                    score: 81,
                    priority: "HIGH",
                    date: new Date("2026-09-03T09:15:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-012",
                    threadId: "demo-thread-012",
                    from: "github@github.com",
                    to: "demo@example.com",
                    subject: "Security alert for your repository",
                    snippet:
                        "A dependency used by your repository has a security vulnerability.",
                    body:
                        "GitHub detected a security vulnerability in one of the dependencies used by your repository.\n\nPlease review the security alert and update the affected dependency.",
                    score: 89,
                    priority: "HIGH",
                    date: new Date("2026-09-02T18:20:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-013",
                    threadId: "demo-thread-013",
                    from: "offers@shopping.example",
                    to: "demo@example.com",
                    subject: "50% off this weekend",
                    snippet: "Don't miss our weekend sale.",
                    body:
                        "Get up to 50% off during our weekend sale.\n\nShop now and take advantage of these limited-time offers.",
                    score: 18,
                    priority: "LOW",
                    date: new Date("2026-09-02T10:00:00"),
                    isImportant: false
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-014",
                    threadId: "demo-thread-014",
                    from: "recruiter@bigtech.example",
                    to: "demo@example.com",
                    subject: "Following up on your application",
                    snippet:
                        "We wanted to follow up regarding your recent application.",
                    body:
                        "Hello,\n\nWe wanted to follow up regarding your recent application for the Backend Developer position.\n\nPlease let us know if you are still interested in continuing with the process.\n\nRegards,\nRecruiting Team",
                    score: 93,
                    priority: "HIGH",
                    date: new Date("2026-09-01T16:45:00"),
                    isImportant: true
                },

                {
                    userId: demoUser.id,

                    gmailId: "demo-email-015",
                    threadId: "demo-thread-015",
                    from: "community@opensource.example",
                    to: "demo@example.com",
                    subject: "Open source project updates",
                    snippet:
                        "Here are the latest updates from the open source community.",
                    body:
                        "Here are the latest updates from the open source community, including new projects, releases and developer discussions.",
                    score: 35,
                    priority: "LOW",
                    date: new Date("2026-08-31T11:30:00"),
                    isImportant: false
                }
            ]
        });

        console.log("Demo emails inserted successfully");

    } catch (err) {
        console.error("Error inserting demo emails:", err);
    }
}

postDemoEmail()