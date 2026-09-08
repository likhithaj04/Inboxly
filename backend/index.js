import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import express from 'express'
const app = express()
import authRouter from './routes/authRoute.js'
import gmailRouter from './routes/gmailApi.js'
import preferenceRouter from './routes/preferenceRoute.js'
import userMailRouter from './routes/userMailRoute.js'
import { apiLimiter } from './Middleware/rateLimitter.js'

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cors({ origin: 'https://inboxly-steel.vercel.app/', credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRouter)

app.use("/email", apiLimiter, userMailRouter);
app.use("/user", apiLimiter, preferenceRouter);
app.use("/", apiLimiter, gmailRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
