import Navbar from '../components/Navbar';
import { handleLogin } from '../services/auth';


export default function About() {

  return (
     <div className='w-auto bg-creme min-h-screen'>

     <Navbar/>
            <div className='flex justify-between md:px-20 md:py-6 border-t border-black text-sm text-amber-950 opacity-70 font-source'></div>

      {/* PAGE HEAD */}
            <div className="flex justify-center items-center lg:gap-40 md:px-20 flex-wrap md:mb-8">

      <div className='flex flex-col gap-4 px-20 pt-16 pb-12 max-w-3xl'>
        <p className='font-caveat md:text-3xl -rotate-2 text-amber-900'>what this actually is —</p>
        <h1 className='font-fraunces font-semibold text-xl md:text-5xl text-black leading-tight'>
          An inbox that sorts itself, without ever guessing in the dark.
        </h1>
        <p className='font-source text-xl opacity-60 max-w-xl'>
          Email-Agent connects to your Gmail and ranks every incoming message using signals that already exist — who you reply to, what you leave for later, what you archive without opening. No new folders to maintain, nothing thrown away.
        </p>
      </div>

      <div className='md:border-t-2 border-black'></div>
</div>
      <div className='border-b border-black w-3/4 mx-auto h-0.5 my-3'></div>

      {/* BELIEF SECTION */}
            <div className="flex justify-center items-center gap-2 lg:gap-40 md:px-20 flex-wrap md:mb-8">

      <div className='flex lg:gap-16 px-20 py-14 flex-wrap'>
        <h2 className='font-fraunces font-semibold text-3xl text-black w-64 shrink-0'>
          Built on a simple belief
        </h2>
        <div className='flex flex-col gap-4 max-w-2xl'>
          <p className='font-source text-base opacity-70'>
            Most inbox tools treat "unread" as "unwanted." That's wrong more often than it's right — people leave important things unread on purpose, saved for when they have time to actually deal with them.
          </p>
          <p className='font-source text-base opacity-70'>
            Email-Agent is built around a different idea: watch what someone actually does — reply speed, open behavior, thread activity, archiving patterns — and let that, not a single flag, decide what surfaces first.
          </p>
        </div>
      </div>

      <div className='border-t-2 border-black'></div>
</div>
      <div className='border-b border-black w-3/4 mx-auto h-0.5 my-3'></div>

      {/* PRINCIPLES */}
            <div className="flex justify-center items-center lg:gap-40 md:px-20 flex-wrap md:mb-8">

      <div className='flex flex-col gap-2 px-4 md:gap-10 md:px-20 py-14'>
        <h2 className='font-fraunces font-semibold text-3xl text-black'>How it decides</h2>

        <div className='flex flex-col'>
          {[
            { n: '01', t: 'It reads relationship signals, not just keywords', d: 'Sender frequency, reply rate, and whether you were the direct recipient or one of fifty on a CC line — these predict importance better than any word in the subject line.' },
            { n: '02', t: 'It scores with a formula you can see', d: 'Every ranking traces back to a short, visible list of reasons — no opaque model deciding silently on your behalf.' },
            { n: '03', t: 'It organizes, it never discards', d: 'Everything lands in Priority, Standard, or Other. Nothing is deleted on your behalf — anything can be moved back with one tap.' },
            { n: '04', t: 'It remembers your corrections', d: 'Mark a sender "not for me" once, and every future email from them settles quietly lower — automatically, without a settings menu.' },
          ].map((p, i) => (
            <div key={i} className='flex flex-row gap-6 items-start py-6 border-b border-stone-300 first:border-t'>
              <span className='font-fraunces text-lg text-amber-700 w-10 shrink-0'>{p.n}</span>
              <div>
                <h3 className='font-fraunces font-semibold text-xl mb-1'>{p.t}</h3>
                <p className='font-source text-base opacity-70 max-w-2xl'>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
</div>
      <div className='border-t-2 border-black'></div>

      {/* SIGNALS — with slanted white + yellow cards */}
            <div className="flex justify-center items-center lg:gap-40 px-20 flex-wrap md:mb-8">

      <div className='flex flex-col gap-2 px-20 py-14'>
        <h2 className='font-fraunces font-semibold text-3xl text-black mb-1'>What actually feeds the score</h2>
        <p className='font-source text-base opacity-70 max-w-2xl mb-8'>
          Six categories of signal, recalculated on every fetch — not stored in bulk, just read and scored.
        </p>

        <div className='flex flex-wrap gap-8 items-start'>

          <div className='border border-black p-6 w-72 bg-white -rotate-2 shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces text-xs uppercase tracking-wide text-teal-800 font-semibold mb-2'>Sender relationship</p>
            <p className='font-source text-sm opacity-70'>Reply rate, frequency, and whether a message was sent directly to you or as part of a mass send.</p>
          </div>

          <div className='border border-black p-6 w-64 bg-yellow-100 rotate-2 shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces text-xs uppercase tracking-wide text-amber-900 font-semibold mb-2'>Gmail labels</p>
            <p className='font-source text-sm opacity-70'>Important, Starred, and category tabs — used as free signals, not rebuilt from scratch.</p>
          </div>

          <div className='border border-black p-6 w-64 bg-white rotate-1 shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces text-xs uppercase tracking-wide text-teal-800 font-semibold mb-2'>Keyword engagement</p>
            <p className='font-source text-sm opacity-70'>How often you actually engage with mail carrying a given topic, compared to your own baseline.</p>
          </div>

          <div className='border border-black p-6 w-64 bg-yellow-100 -rotate-1 shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces text-xs uppercase tracking-wide text-amber-900 font-semibold mb-2'>Thread activity</p>
            <p className='font-source text-sm opacity-70'>Whether a conversation is currently live, or has gone quiet for weeks.</p>
          </div>

          <div className='border border-black p-6 w-64 bg-white rotate-2 shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces text-xs uppercase tracking-wide text-teal-800 font-semibold mb-2'>Recency</p>
            <p className='font-source text-sm opacity-70'>How long a message has actually sat, weighed against how it arrived.</p>
          </div>

        </div>
      </div>
</div>
      <div className='border-t border-stone-300'></div>

      {/* PRIVACY */}
            <div className="flex justify-center items-center lg:gap-40 px-20 flex-wrap md:mb-8">

      <div className='flex flex-col gap-6 px-20 py-14'>
        <h2 className='font-fraunces font-semibold text-3xl text-black'>On privacy</h2>
        <div className='flex flex-wrap gap-12'>
          <div className='flex-1 min-w-56'>
            <p className='font-fraunces text-2xl text-rose-800'>Read-only</p>
            <p className='font-source text-sm opacity-70 mt-2 max-w-64'>Gmail access is read-only by default — Email-Agent never sends or deletes mail on your behalf.</p>
          </div>
          <div className='flex-1 min-w-56'>
            <p className='font-fraunces text-2xl text-rose-800'>No bulk storage</p>
            <p className='font-source text-sm opacity-70 mt-2 max-w-64'>Full email content isn't kept once it's been scored and shown — only lightweight features are retained, and only for mail marked important.</p>
          </div>
          <div className='flex-1 min-w-56'>
            <p className='font-fraunces text-2xl text-rose-800'>Disconnect anytime</p>
            <p className='font-source text-sm opacity-70 mt-2 max-w-64'>Revoking access through your Google account removes Email-Agent's connection immediately.</p>
          </div>
        </div>
      </div>
</div>
      <div className='border-t-2 border-black'></div>

      {/* CLOSING */}
            <div className="flex flex-col justify-center items-center lg:gap-40 px-20 flex-wrap">

      <div className='flex flex-col gap-6 px-4 md:px-20 py-20'>
        <p className='font-fraunces italic text-2xl max-w-xl text-black'>
          The three emails that actually matter today are already sitting in your inbox. This just puts them on top.
        </p>
        <p className='font-caveat md:text-2xl text-amber-900'>— go see it for yourself</p>
        <button className='bg-slate-900 text-creme p-2 md:p-5 rounded-bl-2xl rounded-tr-2xl w-fit hover:cursor-pointer' onClick={handleLogin}>Connect Your Gmail</button>
      </div>
    </div>

      <div className='flex justify-between px-20 py-6 border-t border-black text-sm text-amber-950 opacity-70 font-source'>
        <span>Email-Agent</span>
        <span>Read-only Gmail access · disconnect anytime</span>
      </div>
</div>
  )
}
