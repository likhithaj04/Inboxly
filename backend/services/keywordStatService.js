import { google } from "googleapis";


const retrieveKeywordStat=(emails)=>{
  // console.log("i got email");
  
    const cleanText = (text) => {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\r?\n/g, " ")
    .replace(/[^a-zA-Z\s]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
};
const stopWords = new Set([
   "the", "a", "an", "and", "or", "is", "are", "was", "were", "be", "been", "being",
  "to", "of", "in", "on", "for","with", "your", "you", "this","that", "these", "those","from", "as", "at", "by",
  "it", "its", "into","than", "then","their", "they", "them","there", "here","what", "when", "where", "which",
  "who", "how", "why","not", "no","have", "has", "had","will", "would", "could", "should","can", "may", "might",
  "do", "does", "did", "doing", "done", "more", "most", "some", "any", "other", "another", "own", "now", "just",
  "already", "still",  "very", "really",  "new", "one", "ones",  "way",  "part",  "people",  "something", "anything",
  "everything","thing","things","going","get","got", "getting", "keep", "see", "ago",
]);

const emailStopWords = new Set([
  "hello", "hi", "dear","please", "thanks", "thank",
  "regards", "unsubscribe","click", "view",  "https",
  "http", "www", "com","utm","campaign","medium","source",
  "content","term","lifecycle",

]);

const excludedWords = new Set([
  ...stopWords,
  ...emailStopWords
]);

let processedEmails=[]
  for( const email of emails){
    const text=`${email.subject} ${email.body}`
    const cleanedText=cleanText(text)
    const words=cleanedText.split(" ");

   const keywords = words.filter(
        word => !excludedWords.has(word) && word.length > 2
    );
    // console.log(words);
    processedEmails.push({
        emailId: email.id,
        keywords: keywords,
        labelIds: email.labelIds || []
    });

  }
  // console.log("processed..............",processedEmails);
  console.log("Successfuly processed emails");
  
return processedEmails

}

export default retrieveKeywordStat;