import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function Dashboard() {
  const [emailData, setEmailData] = useState([])
  const [important, setImportant] = useState({})
  const [ignored, setIgnored] = useState({})
  const [expandedId, setExpandedId] = useState(null)
  
useEffect(() => {
  async function fetchData() {
    try {
      const res = await api.get("/api/gmail")
      console.log("fetched emails:", res.data.emails)
      const emails = Array.isArray(res.data.emails) ? res.data.emails : []
      setEmailData(emails)
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
      console.log("Error saving email", err)
    }
  }

  async function handleIgnore(email) {
    console.log("Ignore clicked", email)
    setIgnored(prev => ({ ...prev, [email.id]: !prev[email.id] }))
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

  return (
    <main className='flex-1 px-12 pt-9 pb-16 max-w-4xl'>

      <div className='flex justify-between items-center mb-1.5 p-10'>
        <h1 className='font-fraunces text-2xl font-medium'>Good morning</h1>
        <div className='flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3.5 py-2 w-64'>
          <svg viewBox='0 0 24 24' className='w-4 h-4 stroke-stone-500 fill-none' strokeWidth={1.8}>
            <circle cx='11' cy='11' r='7' /><path d='M20 20l-3.5-3.5' />
          </svg>
          <input type='text' placeholder='Search mail' className='font-source text-sm outline-none w-full bg-transparent' />
        </div>
      </div>
      <p className='font-source text-sm text-stone-500 mb-8 px-10'>
        {emailData.length} mails · <span className='font-caveat text-base text-rose-800'>nothing's been thrown out</span>
      </p>

      {emailData.length === 0 && (
        <p className='font-source text-sm text-stone-500 px-10'>No new emails right now — check back later.</p>
      )}

      {emailData.length > 0 && tiers.map((tier) => (
        <div key={tier.label} className={`mb-9 px-10 ${tier.label === 'Other' ? 'opacity-70' : ''}`}>
          <div className='flex items-center gap-2 mb-3.5'>
            <div className={`w-2.5 h-2.5 rounded-full ${tier.dot}`}></div>
            <h2 className='font-fraunces font-semibold text-base'>{tier.label}</h2>
            <span className='text-xs bg-black text-creme px-2 py-0.5 rounded-full'>{tier.items.length}</span>
          </div>

          <div className='bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] overflow-hidden'>
            {tier.items.map((email) => {
              const isOpen = expandedId === email.id
              const paragraphs = (email.body || '').split(/\n\s*\n/).filter(Boolean)

              return (
                <div key={email.id} className='p-4 border-b border-stone-200 last:border-b-0'>
                  <div className='flex justify-between items-baseline'>
                    <span className='font-source text-sm font-medium'>{email.from}</span>
                    <span className='font-source text-xs text-stone-500'>{email.date}</span>
                  </div>
                  <span className='font-source text-xs text-stone-500 block'>to {email.to}</span>

                  <p className='font-fraunces font-semibold text-sm mt-2'>{email.subject}</p>

                  <div className='font-source text-sm text-stone-700 mt-1.5 leading-relaxed'>
                    {paragraphs.length === 0 ? null
                      : isOpen
                        ? paragraphs.map((p, pi) => <p key={pi} className='mb-2'>{p}</p>)
                        : <p className='line-clamp-2'>{paragraphs[0]}</p>
                    }
                  </div>

                  <div className='flex items-center justify-end gap-2 mt-3'>
                    <button
                      onClick={() => setExpandedId(isOpen ? null : email.id)}
                      className='font-source text-xs underline mr-auto'
                    >
                      {isOpen ? 'Show less' : 'Read more'}
                    </button>
                    <button
                      onClick={() => handleSaveEmail(email)}
                      className={`font-source text-xs px-2.5 py-1 rounded-full border border-black ${important[email.id] ? 'bg-rose-700 text-creme' : 'bg-white'}`}
                    >
                      Mark important
                    </button>
                    <button
                      onClick={() => handleIgnore(email)}
                      className={`font-source text-xs px-2.5 py-1 rounded-full border border-black ${ignored[email.id] ? 'bg-stone-700 text-creme' : 'bg-white'}`}
                    >
                      Do not suggest
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

    </main>
  )
}