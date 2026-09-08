import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const [emailData, setEmailData] = useState([])
  const [important, setImportant] = useState({})
  const [ignored, setIgnored] = useState({})
  const [expandedId, setExpandedId] = useState(null)
  const [activeSummaryId, setActiveSummaryId] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(null)
  const [summaries, setSummaries] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const isDemo = localStorage.getItem("isDemo")
        if (isDemo === "true") {
          const res = await api.get("/api/demoemail")
          const emails = Array.isArray(res.data.emails) ? res.data.emails : []
          setEmailData(emails)
        } else {
          const res = await api.get("/api/gmail")
          const emails = Array.isArray(res.data.emails) ? res.data.emails : []
          setEmailData(emails)
        }
      } catch (err) {
        console.log("Error fetching emails", err)
      }
    }
    fetchData()
  }, [])

  async function handleSaveEmail(email) {
    try {
      await api.post("/email/savemail", email)
      setImportant(prev => ({ ...prev, [email.id]: !prev[email.id] }))
    } catch (err) {
      toast.error("Already saved")
      console.log("Error saving email", err)
    }
  }

  async function handleIgnore(email) {
    setIgnored(prev => ({ ...prev, [email.id]: !prev[email.id] }))
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
      console.log(err)
    } finally {
      setSummaryLoading(null)
    }
  }

  const third = Math.ceil(emailData.length / 3)
  const high = emailData.slice(0, third)
  const medium = emailData.slice(third, third * 2)
  const low = emailData.slice(third * 2)

  const tiers = [
    { label: 'Priority', items: high, dot: 'bg-rose-700' },
    { label: 'Standard', items: medium, dot: 'bg-teal-800' },
    { label: 'Other', items: low, dot: 'bg-stone-400' },
  ]

  const activeSummaryEmail = emailData.find(e => e.id === activeSummaryId)

  return (
   <div className='flex flex-col lg:flex-row w-full bg-creme'>
  <main className='flex-1 px-4 sm:px-6 md:px-12 pt-6 md:pt-9 pb-16 max-w-6xl'>

    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-1.5 p-4 sm:p-6 md:p-10'>
      <h1 className='font-fraunces text-xl md:text-2xl font-medium'>Good morning</h1>
      <div className='flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3.5 py-2 w-full sm:w-64'>
        <svg viewBox='0 0 24 24' className='w-4 h-4 stroke-stone-500 fill-none shrink-0' strokeWidth={1.8}>
          <circle cx='11' cy='11' r='7' /><path d='M20 20l-3.5-3.5' />
        </svg>
        <input type='text' placeholder='Search mail' className='font-source text-sm outline-none w-full bg-transparent' />
      </div>
    </div>
    <p className='font-source text-sm text-stone-500 mb-6 md:mb-8 px-4 sm:px-6 md:px-10'>
      {emailData.length} mails · <span className='font-caveat text-base text-rose-800'>nothing's been thrown out</span>
    </p>

    {emailData.length === 0 && (
      <p className='font-source text-sm text-stone-500 px-4 sm:px-6 md:px-10'>No new emails right now — check back later.</p>
    )}

    {emailData.length > 0 && tiers.map((tier) => (
      <div key={tier.label} className={`mb-9 px-4 sm:px-6 md:px-10 ${tier.label === 'Other' ? 'opacity-70' : ''}`}>
        <div className='flex items-center gap-2 mb-3.5'>
          <div className={`w-2.5 h-2.5 rounded-full ${tier.dot}`}></div>
          <h2 className='font-fraunces font-semibold text-base'>{tier.label}</h2>
          <span className='text-xs bg-black text-creme px-2 py-0.5 rounded-full'>{tier.items.length}</span>
        </div>

        <div className='bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] overflow-hidden'>
          {tier.items.map((email) => {
            const isOpen = expandedId === email.id
            const isSummaryActive = activeSummaryId === email.id
            const paragraphs = (email.body || '').split(/\n\s*\n/).filter(Boolean)

            return (
              <div key={email.id} className={`p-3 sm:p-4 border-b border-slate-600 last:border-b-0 ${isSummaryActive ? 'bg-stone-50' : ''}`}>
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
                    onClick={() => handleSaveEmail(email)}
                    className={`font-source text-xs px-2.5 py-1 rounded-full border border-black whitespace-nowrap ${important[email.id] ? 'bg-rose-700 text-creme' : 'bg-white'}`}
                  >
                    Mark important
                  </button>
                  <button
                    onClick={() => handleIgnore(email)}
                    className={`font-source text-xs px-2.5 py-1 rounded-full border border-black whitespace-nowrap ${ignored[email.id] ? 'bg-stone-700 text-creme' : 'bg-white'}`}
                  >
                    Do not suggest
                  </button>
                  <button
                    onClick={() => getSummary(email)}
                    className={`font-source text-xs px-2.5 py-1 rounded-full border border-black cursor-pointer whitespace-nowrap ${isSummaryActive ? 'bg-slate-900 text-creme' : 'bg-white'}`}
                  >
                    Summary
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ))}

  </main>

  {activeSummaryId && (
    <aside className='w-full lg:w-96 shrink-0 lg:sticky lg:top-0 lg:h-screen border-t lg:border-t-0 lg:border-l border-stone-300 bg-creme px-5 sm:px-8 py-6 sm:py-10 lg:overflow-y-auto'>

      <div className='flex justify-between items-start mb-6'>
        <p className='font-caveat text-2xl text-amber-900 -rotate-2'>the short version —</p>
        <button
          onClick={() => setActiveSummaryId(null)}
          className='font-source text-xs text-stone-500 hover:text-black underline underline-offset-4'
        >
          Close
        </button>
      </div>

      <div className='bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] p-5 sm:p-6'>
        {activeSummaryEmail && (
          <>
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-0 mb-1'>
              <span className='font-source text-xs font-medium text-stone-500 truncate'>{activeSummaryEmail.from}</span>
              <span className='font-source text-xs text-stone-400 shrink-0'>{activeSummaryEmail.date}</span>
            </div>
            <p className='font-fraunces font-semibold text-base text-black mb-4'>{activeSummaryEmail.subject}</p>
          </>
        )}

        {summaryLoading === activeSummaryId ? (
          <p className='font-source text-sm text-stone-500'>Generating summary…</p>
        ) : (
          <p className='font-source text-sm text-stone-700 leading-relaxed'>
            {summaries[activeSummaryId] || 'No summary available.'}
          </p>
        )}
      </div>

    </aside>
  )}

</div>
  )
}