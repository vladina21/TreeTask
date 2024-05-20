import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Task from './pages/Task'
import Users from './pages/Users'
import TaskDetails from './pages/TaskDetails'
import Trash from './pages/Trash'
import { Toaster } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useReducer, useRef, Fragment } from 'react'
import { setOpenSidebar } from './redux/slices/authSlice'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import {IoMdClose} from 'react-icons/io'
import Organigram from './pages/Organigram'



function Layout() {
  const {user} = useSelector(state => state.auth);
  const location = useLocation()
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar/>

      </div>

      <MobildeSidebar />

      <div className='flex-1 overflow-y-auto'>

        <Navbar />

        <div className='p-4 2x1:px-10'> 
          <Outlet />  
        </div>
      </div>
     
    </div>
  ) : (

    <Navigate to='/login' state={{ from: location }} replace />
  )



}


const MobildeSidebar = () => {
  const {isSidebarOpen} = useSelector(state => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => { 
    dispatch(setOpenSidebar(false));
  }
  
  return <>
  <Transition
          show={isSidebarOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {(ref) => (
            <div
              ref={(node) => (mobileMenuRef.current = node)}
              className={clsx('md:hidden w-full h-full bg-black/40 transition-all duration-700 transform', isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
              onClick={() => closeSidebar()}
              >

                <div className='bg-white w-3/4 h-full'>
                  <div className='w-full flex justify-end px-5 mt-5'>
                    <button
                    onClick={()=> closeSidebar()}
                    className='flex justify-end items-end'>
                      <IoMdClose size={25}/>
                    </button>
                  </div>

                  <div className='-mt-10'>
                    <Sidebar/>
                  </div>
                </div>
            </div>
          )}
        </Transition>
  </>
}

function App() {
  

  return (
    <main className='w-full main-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element = {<Layout/>}>
          <Route index path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Task />} />
          <Route path='/completed/:status' element={<Task />} />
          <Route path='/in-progress/:status' element={<Task />} />
          <Route path='/todo/:status' element={<Task />} />
          <Route path='/users' element = {<Users/>}/>
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path='/organigram' element={<Organigram />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>

      <Toaster richColors />
    
    
     
    </main>
    
  )
}

export default App
