import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsSendFill } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi'; 
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';

function NavBar({ data }) {
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const logoutHandle = () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem('User');
      toast.success("Logout Successfully!");
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white flex items-center justify-between px-4 md:px-12 h-16 shadow-md relative">
      <LoadingBar color="orange" ref={ref} />

      {}
      <div className="text-3xl md:text-4xl font-bold font-mono tracking-wide text-yellow-500 cursor-pointer">
     < span className="text-cyan-500">Expe</span><span className="text-orange-500">nse</span>
      </div>

      {}
      <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {}
      <div className={`md:flex items-center gap-6 ${isMenuOpen ? 'absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col' : 'hidden md:flex'}`}>
        
        {}
        <button
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
          onClick={() => setEmailModalOpen(true)}
        >
          Send Email
        </button>

        {}
        {isEmailModalOpen && (
          <div className="absolute top-14 right-0 w-72 p-4 bg-gray-800 rounded-lg shadow-xl">
            <button
              className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full text-xs flex items-center justify-center"
              onClick={() => setEmailModalOpen(false)}
            >
              ✕
            </button>
            <p className="text-sm text-center mb-2 text-gray-300">
              Get your expenses for the last <b>month</b> via email
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                onChange={(e) => setUserEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button
                onClick={() => sendEmail(userEmail, data)}
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                <BsSendFill size={20} />
              </button>
            </div>
          </div>
        )}

        {}
        <button
          onClick={logoutHandle}
          className="relative px-6 py-2 text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-500 rounded-full overflow-hidden transition-all duration-300 group"
        >
          <span className="absolute inset-0 flex items-center justify-center bg-indigo-500 text-white transition-transform duration-300 transform -translate-x-full group-hover:translate-x-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="relative transition-all duration-300 group-hover:translate-x-full">
            LogOut
          </span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
