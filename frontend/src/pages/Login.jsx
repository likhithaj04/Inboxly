import { handleLogin } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'

export default function Login() {
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  async function handleDemoLogin() {
    try {
      setLoading(true)
    const res=  await api.post('/auth/demoLogin',{
        name:"Demo User",
        email:" demo@example.com"
      })
// console.log(res);

      if (res.data.isDemo) {
  localStorage.setItem("isDemo", "true");

}
      navigate('/home')
    } catch (err) {
      toast.error("Login failed, please login again")
      // console.log('Demo login failed', err)
    }
  }

  return (
    <div className='w-auto bg-creme min-h-screen flex items-center justify-center px-6'>

      <div className='flex flex-col gap-10 max-w-md w-full'>

        <div className='text-center'>
          <h1 className='font-fraunces font-semibold text-4xl text-black mb-2'>EMAIL-AGENT</h1>
          <p className='font-caveat text-2xl text-amber-900 -rotate-1'>pick a way in —</p>
        </div>

        <div className='bg-white border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] p-8 flex flex-col gap-4'>
          <h2 className='font-fraunces font-semibold text-xl text-black'>Login with Google</h2>
          <p className='font-source text-sm text-stone-500'>
            Connects your real inbox — read-only access, disconnect anytime.
          </p>
          <button
            type='button'
            onClick={handleLogin}
            className='bg-slate-900 text-creme font-source text-sm p-3.5 rounded-bl-2xl rounded-tr-2xl hover:cursor-pointer'
          >
            Continue with Google
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex-1 h-px bg-stone-300'></div>
          <span className='font-caveat text-xl text-stone-500'>or, just look around</span>
          <div className='flex-1 h-px bg-stone-300'></div>
        </div>

        <div className='bg-yellow-100 border-[1.5px] border-black rounded-md shadow-[5px_5px_0_0_#000] p-8 flex flex-col gap-4 -rotate-1'>
          <h2 className='font-fraunces font-semibold text-xl text-black'>Try the sandbox</h2>
          <p className='font-source text-sm text-stone-600'>
            No Gmail needed — explore a demo inbox with sample mail, already sorted into trays.
          </p>
          <button
            type='button'
            onClick={handleDemoLogin}
            className='bg-white border-2 border-black text-black font-source text-sm p-3.5 rounded-bl-2xl rounded-tr-2xl hover:bg-black hover:text-creme hover:cursor-pointer'
          >
            {loading?"loading your emails":"Enter as demo user"}
          </button>
        </div>

        <p className='font-source text-xs text-stone-500 text-center'>
          Google verification for this project is still pending — the sandbox account lets anyone try it fully in the meantime.
        </p>

      </div>

    </div>
  )
}