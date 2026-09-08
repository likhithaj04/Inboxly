import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { handleLogout } from '../services/auth'

const SIDEBAR_ITEMS = [
  {
    label: 'All Mail',
    path: '/home',
    icon: (
      <><path d="M3 7l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></>
    )
  },
  {
    label: 'Saved',
    path: '/home/savedmails',
    icon: <path d="M6 3h12v18l-6-4-6 4V3z" />
  },
  {
    label: 'other mails',
    path: '/home/temporaryMails',
    icon: (
      <><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>
    )
  },
]

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NavItems = () => (
    <>
      {SIDEBAR_ITEMS.map((item, i) => {
        const isActive = location.pathname === item.path

        return (
          <Link
            key={i}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`w-13 h-13 rounded-xl flex flex-col items-center justify-center gap-1 relative cursor-pointer no-underline
              ${isActive ? 'bg-white/10 text-creme' : 'text-stone-400 hover:text-stone-200'}`}
          >
            {isActive && <div className='absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-rose-700 rounded-full'></div>}
            <svg viewBox='0 0 24 24' className='w-5 h-5 stroke-current fill-none' strokeWidth={1.7}>
              {item.icon}
            </svg>
            <span className='text-[9px] tracking-wide'>{item.label}</span>
          </Link>
        )
      })}
    </>
  )

  return (
    <>
      {/* MOBILE TOP BAR — replaces the full rail below md */}
      <div className='md:hidden flex items-center justify-between bg-stone-900 px-4 py-3 sticky top-0 z-40'>
        <div className='w-9 h-9 rounded-lg bg-rose-800 flex items-center justify-center font-fraunces font-bold text-white text-sm'>EA</div>
        <button
          onClick={() => setMobileOpen(true)}
          className='text-white p-2 rounded-lg hover:bg-white/10'
          aria-label='Open menu'
        >
          <svg viewBox='0 0 24 24' className='w-6 h-6 stroke-current fill-none' strokeWidth={1.8}>
            <path d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className='md:hidden fixed inset-0 z-50 flex'>
          <div
            className='fixed inset-0 bg-black/40'
            onClick={() => setMobileOpen(false)}
          ></div>

          <div className='relative w-64 bg-stone-900 h-full flex flex-col items-center py-6 gap-2 shrink-0'>
            <button
              onClick={() => setMobileOpen(false)}
              className='absolute top-4 right-4 text-white p-1 rounded-lg hover:bg-white/10'
              aria-label='Close menu'
            >
              <svg viewBox='0 0 24 24' className='w-5 h-5 stroke-current fill-none' strokeWidth={1.8}>
                <path d='M6 6l12 12M18 6L6 18' />
              </svg>
            </button>

            <div className='w-9 h-9 rounded-lg bg-rose-800 flex items-center justify-center font-fraunces font-bold text-white text-sm mb-6 mt-4'>EA</div>

            <NavItems />

            <div className='flex-1'></div>
            <div className='w-14 h-9 rounded-full bg-teal-800 flex items-center justify-center font-fraunces text-sm text-white mb-2'>
              <a href='/'>Home</a>
            </div>
            <button
              onClick={handleLogout}
              className='hover:bg-slate-600 cursor-pointer underline underline-offset-2 text-white p-1 border rounded-xl'
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP RAIL */}
      <aside className='hidden md:flex w-30 bg-stone-900 flex-col items-center py-6 gap-2 shrink-0 min-h-screen'>
        <div className='w-9 h-9 rounded-lg bg-rose-800 flex items-center justify-center font-fraunces font-bold text-white text-sm mb-6'>EA</div>

        <NavItems />

        <div className='flex-1'></div>
        <div className='w-14 h-9 rounded-full bg-teal-800 flex items-center justify-center font-fraunces text-sm text-white mb-2'>
          <a href='/'>Home</a>
        </div>
        <button
          onClick={handleLogout}
          className='hover:bg-slate-600 cursor-pointer underline underline-offset-2 text-white p-1 border rounded-xl'
        >
          Logout
        </button>
      </aside>
    </>
  )
}