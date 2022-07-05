import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';



//styles
import './App.css'


//pages and component
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';

function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>

              <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />}></Route>

              <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />}></Route>

              <Route path='/projects/:id' element={user ? <Project /> : <Navigate to='/login' />}></Route>

              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}></Route>

              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}></Route>

            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App


/* pages

  -dashboard (HomePage)
  -login
  -signup
  -create
  -project (project details)

*/