import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleLogin } from '../services/auth'
import api from '../services/api'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await api.get("/auth/me")
        setUser(res.data.user)
      } catch (err) {
        setUser(null)
      }
    }
    checkUser()
  }, [])

  function handleFetchMail() {
    navigate("/home")
  }

  return (
    <div className='flex p-2 justify-between md:mr-28'>
      <div className='p-2 md:ml-90'>
        <Link to='/'>
          <h1 className='font-black text-4xl text-blues font-fraunces'>EMAIL-AGENT</h1>
        </Link>
      </div>
      <div className='p-4'>
        <ul className='flex gap-12 justify-center items-center text-black font-bold font-source'>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/about'>ABOUT</Link></li>
          <li>
            <button
              onClick={user ? handleFetchMail : handleLogin}
              className='hover:bg-amber-100 cursor-pointer underline underline-offset-2'
            >
              {user ? 'Fetch Mail' : 'Login'}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}