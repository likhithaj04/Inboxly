import maglass from '../assets/mglass.webm'
import { handleLogin } from '../services/auth';
import Navbar from '../components/NAvbar';

export default function LandingPage() {
  

  return (
    <div className='w-auto bg-creme min-h-screen'>

           <Navbar />


      <div className='border-b border-black  ml-auto h-1 my-3'></div>

      <div className="flex justify-center items-center lg:gap-40 px-20 flex-wrap md:mb-8">

        <div className="w-152 pt-20 flex flex-col gap-6 text-amber-950">
          <p className="font-caveat text-3xl -rotate-2">
            no more guessing what's important
          </p>

          <p className="font-fraunces font-bold text-5xl text-black">
            Your inbox, sorted like actual mail on a desk.
          </p>

          <p className="font-source text-xl opacity-60">
            got tired of scrolling past three things that mattered to find the fourth?
            So I built something that reads what you reply to, open, and ignore —
            and sorts every new email into a tray before you even look.
            Nothing gets thrown out. It just moves to a smaller pile.
          </p>
          <div className='flex gap-3'>
            <button className='bg-slate-900 text-creme p-5 rounded-bl-2xl rounded-tr-2xl hover:cursor-pointer' onClick={handleLogin}>Connect Your Gmail</button>
            <button className='underline underline-offset-8 text-black italic'>See how it decides</button>
          </div>
        </div>

        <div className="w-100 flex flex-col gap-10 relative mt-20">

          <div className='border border-black p-6 w-70 font-source border-b-8 border-r-7 -rotate-3 bg-white shadow-[4px_4px_0_0_#000]'>
            <p>
              <span className='text-amber-950 font-bold'>Priority</span><br />
              Priya — contract redline<br />
              Interview, Thursday 3pm?<br />
              Landlord — rent confirm
            </p>
          </div>

          <div className='flex flex-row items-center gap-10'>
            <video className='w-100' src={maglass} autoPlay loop muted playsInline />
            <div className='border border-black p-6 w-70 font-source border-b-8 border-r-7 rotate-2 bg-white shadow-[4px_4px_0_0_#000]'>
              <p>
                <span className='text-amber-950 font-bold'>Standard</span><br />
                Figma — new comments<br />
                Team standup notes
              </p>
            </div>
          </div>

          <div className='border border-black p-6 w-70 font-source border-b-8 border-r-7 -rotate-[1.5deg] bg-white shadow-[4px_4px_0_0_#000]'>
            <p>
              <span className='text-amber-950 font-bold'>Other</span><br />
              Weekly Digest Co.
            </p>
          </div>

        </div>

      </div>

      {/* do  not touvh this */}
      <div className='border-b border-black w-3/4 mx-auto h-0.5 my-3'></div>

      <div className='flex gap-30 p-10 mx-auto items-center  justify-center'>

        <div> <p className="font-caveat text-3xl -rotate-2 text-amber-900"> a note on unread —</p></div>
        <div className='w-250'>
          <p className='font-fraunces  text-3xl italic'>Unread was never the same thing as unwanted. Some things you leave for tonight, on purpose.</p>
        </div>
      </div>
      <div className='border-b border-black w-3/4 mx-auto h-0.5 my-3'></div>
      {/* to this */}

      <div className="flex justify-center items-center lg:gap-40 px-20 flex-wrap">
        <div className='flex flex-col gap-10 py-10 items-start w-172'>

          <div className='flex flex-row gap-6 items-start'>
            <h1 className='flex border border-black rounded-full h-17 w-17 shrink-0 items-center justify-center font-fraunces'>1</h1>
            <div>
              <h1 className='font-fraunces font-semibold text-xl mb-1'>It notices patterns</h1>
              <p className='font-source text-base opacity-70'>
                Who you reply to fast, who you leave for later, what you archive without a glance <br /> pulled together the moment new mail lands.
              </p>
            </div>
          </div>

          <div className='flex flex-row gap-6 items-start'>
            <h1 className='flex border border-black rounded-full h-17 w-17 shrink-0 items-center justify-center font-fraunces -rotate-3'>2</h1>
            <div>
              <h1 className='font-fraunces font-semibold text-xl mb-1'>It scores, out loud</h1>
              <p className='font-source text-base opacity-70'>
                A plain formula, not a black box — you can always see the handful of reasons a message landed where it did.
              </p>
            </div>
          </div>

          <div className='flex flex-row gap-6 items-start'>
            <h1 className='flex border border-black rounded-full h-17 w-17 shrink-0 items-center justify-center font-fraunces rotate-2'>3</h1>
            <div>
              <h1 className='font-fraunces font-semibold text-xl mb-1'>It sorts, not deletes</h1>
              <p className='font-source text-base opacity-70'>
                Priority, Standard, Other — three trays, everything one tap from being moved back where it belongs.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className='border-2 border-black w-3/4 mx-auto h-0.5 my-3'></div>

      {/* CORRECTION SECTION */}
      <div className="flex justify-center items-center lg:gap-40 px-20 flex-wrap">

        <div className='flex flex-col gap-4 py-10 w-152'>
          <h1 className='font-fraunces font-semibold text-3xl text-black'>
            Correct it once. It doesn't forget.
          </h1>
          <p className='font-source text-lg text-amber-950 opacity-70 max-w-md'>
            Pin a note on a sender — "not for me" — and every future email from them settles quietly into Other. No settings menu, no re-training.
          </p>
          <p className='font-source text-lg text-amber-950 opacity-70 max-w-md'>
            Mark someone important, even a stranger, and the whole thread gets watched more closely from then on.
          </p>
        </div>

        <div className='relative w-100 h-55'>
          <div className='absolute top-5 left-0 w-70 border border-black p-6 bg-white shadow-[4px_4px_0_0_#000]'>
            <p className='font-fraunces font-semibold text-sm'>newsletter@marketwatch.io</p>
            <p className='font-source text-x opacity-60 mt-1'>6 emails this month, 0 opened</p>
          </div>
          <div className='absolute top-25 right-0 w-48 border border-black bg-amber-100 p-5 -rotate-3 font-caveat text-xl shadow-[3px_3px_0_0_rgba(38,34,26,0.15)]'>
            not for me — stop showing these up top
          </div>
        </div>

      </div>

      <div className='border-2 border-black w-3/4 mx-auto h-0.5 my-3'></div>

      {/* CLOSING */}
      <div className="flex justify-center items-center lg:gap-40 md:p-8 flex-wrap">
        
        <p className='font-fraunces italic text-2xl max-w-xl text-black'>
          Somewhere your inbox already knows which three emails actually matter today. This just puts them at the top of the pile.
        </p>
        <div className='flex gap-4'>
           <p className='font-caveat text-2xl text-amber-900'>— now go find them</p>
        <button className='bg-slate-900 text-creme p-5 rounded-bl-2xl rounded-tr-2xl w-fit hover:cursor-pointer' onClick={handleLogin}>Connect Your Gmail</button>
        </div>
       
      </div>

      {/* FOOTER */}
      <div className='flex justify-between px-20 py-6 border-t border-black text-sm text-amber-950 opacity-70 font-source lg:mt-20'>
        <span>Email-Agent</span>
        <span>Read-only Gmail access · disconnect anytime</span>
      </div>

    </div>
  )
}