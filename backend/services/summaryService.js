import Groq from "groq-sdk"
const groq=new Groq( {apiKey:process.env.GROQ_API_KEY})

const getSummary = async ( subject, body) => {
// console.log("AI MODEL:", process.env.AI_MODEL);

// const models = await groq.models.list();

// console.log(
//     models.data.map(model => model.id)
// );
// console.log("bodyyyyyyyyyyy",body);


  const res = await groq.chat.completions.create({
    model: process.env.AI_MODEL,

    messages: [
      {
        role: "user",
        content: `
Summarize the following email clearly and briefly.

Subject: ${subject}

Email:
${body}

Instructions:
- Give a concise summary in 2-4 sentences.
- Identify the main purpose of the email.
- Mention important actions, requests, deadlines, dates, or decisions if present.
- Do not add information that is not present in the email.
- Ignore HTML, formatting, tracking text, and irrelevant boilerplate.
- Do not expose or repeat sensitive information such as OTPs, passwords, bank details, or authentication codes.
- If the email is promotional or informational, summarize what it is about.
- Return only the summary, without headings or extra explanation.
`
      }
    ]
  });

  return res.choices[0].message.content;
};

export default getSummary