import React, { useState, useEffect } from 'react'
import api from '../services/api';
import { toast } from 'react-toastify';

export default function TemporaryMails() {
  const [emails, setEmails] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [summaries, setSummaries] = useState({})
  const [activeSummaryId, setActiveSummaryId] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(null)
  const [important, setImportant] = useState({})   // added — tracks marked emails by id

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/email/tempMail")
        // console.log(res.data);
        setEmails(res.data.data || [])
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [])

  async function handleSaveEmail(email) {
    try {
      await api.post("/email/saveTempMail", email)
      setImportant(prev => ({ ...prev, [email.id]: !prev[email.id] }))
      toast.success("Email saved")
    } catch (err) {
      // console.log("Error saving email", err)
      toast.error("Failed to save email")
    }
  }

  async function getSummary(email) {
    setActiveSummaryId(email.id)
    if (summaries[email.id]) return

    setSummaryLoading(email.id)
    try {
      const res = await api.post("/email/summary", {
        body: email.body,
        subject: email.subject,
        emailid: email.id
      })
      setSummaries(prev => ({ ...prev, [email.id]: res.data.data }))
    } catch (err) {
      console.log(err);
    } finally {
      setSummaryLoading(null)
    }
  }

  const activeEmail = emails.find(e => e.id === activeSummaryId)

  return (
  <main className='flex-1 px-4 sm:px-6 md:px-30 pt-6 md:pt-9 pb-16 max-w-8xl relative'>

    <div className='absolute top-6 right-1 w-36 bg-yellow-100 border border-black p-3 shadow-[3px_3px_0_0_#000] rotate-3 hidden xl:block'>
      <p className='font-caveat text-lg text-amber-900 leading-tight'>your email will be cleared in 7 days</p>
    </div>
    <div className='absolute top-30 right-0.5 w-32 bg-rose-100 border border-black p-3 shadow-[3px_3px_0_0_#000] -rotate-2 hidden xl:block'>
      <p className='font-caveat text-lg text-rose-800 leading-tight'>pinned = important</p>
    </div>

    <div className='flex justify-between items-center mb-1.5'>
      <h1 className='font-fraunces text-xl md:text-2xl font-medium'>Temporay mails</h1>
    </div>
    <p className='font-source text-sm text-stone-500 mb-6 md:mb-8'>
      {emails.length} pinned · <span className='font-caveat text-base text-rose-800'>Missed an email - check here</span>
    </p>

    {emails.length === 0 && (
      <p className='font-source text-sm text-stone-500'>Nothing saved yet — mark an email important and it'll show in saved mails.</p>
    )}

    {emails.length > 0 && (
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-start'>

        <div className='w-full lg:flex-1 bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] overflow-hidden'>
          {emails.map((email) => {
            const isOpen = expandedId === email.id
            const paragraphs = (email.body || '').split(/\n\s*\n/).filter(Boolean)
            const isActive = activeSummaryId === email.id
            const isImportant = !!important[email.id]

            return (
              <div key={email.id} className={`p-3 sm:p-4 border-b border-stone-200 last:border-b-0 ${isActive ? 'bg-stone-50' : ''}`}>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-0'>
                  <span className='font-source text-sm font-medium truncate'>{email.from}</span>
                  <span className='font-source text-xs text-stone-500 shrink-0'>{email.date}</span>
                </div>
                <span className='font-source text-xs text-stone-500 block truncate'>to {email.to}</span>

                <p className='font-fraunces font-semibold text-sm mt-2'>{email.subject}</p>

                <div className='font-source text-sm text-stone-700 mt-1.5 leading-relaxed'>
                  {paragraphs.length === 0 ? null
                    : isOpen
                      ? paragraphs.map((p, pi) => <p key={pi} className='mb-2'>{p}</p>)
                      : <p className='line-clamp-2'>{paragraphs[0]}</p>
                  }
                </div>

                <div className='flex flex-wrap items-center justify-end gap-2 mt-3'>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : email.id)}
                    className='font-source text-xs underline mr-auto'
                  >
                    {isOpen ? 'Show less' : 'Read more'}
                  </button>

                  <button
                    className={`font-source text-xs px-2.5 py-1 rounded-full border border-black cursor-pointer whitespace-nowrap ${isActive ? 'bg-slate-900 text-creme' : 'bg-white'}`}
                    onClick={() => getSummary(email)}
                  >
                    Summary
                  </button>

                  <button
                    onClick={() => handleSaveEmail(email)}
                    className={`font-source text-xs px-2.5 py-1 rounded-full border border-black cursor-pointer whitespace-nowrap ${isImportant ? 'bg-rose-700 text-creme' : 'bg-white hover:bg-rose-700 hover:text-creme'}`}
                  >
                    {isImportant ? 'Marked important' : 'Mark Important'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className='w-full lg:w-140 shrink-0 lg:sticky lg:top-9'>
          {!activeSummaryId && (
            <div className='border border-dashed border-stone-400 rounded-md p-5 mt-20'>
              <p className='font-source text-sm text-stone-500'>Click "Summary" on any email to see it here.</p>
            </div>
          )}

          {activeSummaryId && (
            <div className='bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] p-5'>
              <p className='font-fraunces font-semibold text-sm mb-1'>{activeEmail?.subject}</p>
              <p className='font-source text-xs text-stone-500 mb-4'>{activeEmail?.from}</p>

              {summaryLoading === activeSummaryId && (
                <p className='font-source text-sm text-stone-500'>Summarizing…</p>
              )}

              {summaryLoading !== activeSummaryId && (
                <p className='font-source text-sm text-stone-700 leading-relaxed'>
                  {summaries[activeSummaryId]}
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    )}

  </main>
)
  
}