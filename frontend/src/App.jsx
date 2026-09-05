
import './App.css'
import Login from './pages/Login'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Preference from './pages/Preference'
import LandingPage from './Landing/LandingPage'
import About from './Landing/About'
import Dashboard from './pages/Dashboard'
import SavedMaills from './pages/SavedMaills'
import TemporaryMails from './pages/TemporaryMails'

function App() {
  return (
  
<Routes>
  <Route path='/' element={<LandingPage/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/login' element={<Login/>} />
<Route path='/preference' element={<Preference/>}/>

<Route path='/home' element={<Home/>}>
  <Route index element={<Dashboard/>}/>
  <Route path='Dashboard' element={<Dashboard/>}/>
  <Route path='savedmails' element={<SavedMaills/>}/>
  <Route path='temporaryMails' element={<TemporaryMails/>}/>

</Route>
</Routes>

    
  )
}

export default App
