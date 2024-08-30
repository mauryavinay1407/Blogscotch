import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Mydashboard } from './pages/Mydashboard';

function App() {
  
  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-pink-800 to-slate-800'>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='signup' element={<Signup />}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Mydashboard />}/>
     </Routes>
    </BrowserRouter>
    </div>
  )
}


export default App
