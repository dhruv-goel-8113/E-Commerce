import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import { MdMenu, MdClose } from 'react-icons/md';
import { FaOpencart } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import logout from '../assets/logout.svg';
import user from '../assets/user.svg';
import { ShopContext } from '../Context/ShopContext.jsx';

// Import Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  const handleLogout = () => {
    toast.success('Successfully Logged Out!');
    setTimeout(() => {
      localStorage.removeItem('auth-token');
      window.location.replace('/');
    }, 1500);
  };

  const handleLoginSuccess = () => {
    toast.success('Successfully Logged In!');
  };

  const handleSignupSuccess = () => {
    toast.success('Successfully Created Account!');
  };

  const handleLoginError = () => {
    toast.error('Wrong email or password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 max_padd_container !w-[100vw] bg-white ring-1 ring-slate-900/5 z-10">
        <div className="px-1 sm:px-4 flexBetween py-3 max-xs:px-2">
          <div>
            <Link>
              <img src={logo} alt="" className="w-[60px] h-[40px] sm:w-20 sm:h-16" />
            </Link>
          </div>
          {/* Navbar Desktop */}
          <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-14"} />
          {/* Navbar Mobile */}
          <Navbar
            containerStyles={`${
              menuOpened
                ? 'flex items-start flex-col fixed gap-y-8 top-20 right-8 py-8 bg-white px-6 rounded-3xl shadow-md w-40 medium-14 ring-1 ring-slate-900/5 transition-all duration-300'
                : 'flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]'
            }`}
          ></Navbar>
          <div className="flexBetween sm:gap-x-1 bold-16">
            {!menuOpened ? (
              <MdMenu
                className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 h-6 w-6 ring-slate-900/30 sm:h-8 sm:w-8 rounded-full"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 h-6 w-6 ring-slate-900/30 sm:h-8 sm:w-8 rounded-full"
                onClick={toggleMenu}
              />
            )}
            <div className="flexBetween gap-x-1 sm:gap-x-6">
              <NavLink to={'/cart-page'} className={'flex'}>
                <FaOpencart className="ml-2 p-1 h-6 w-6 sm:h-8 sm:w-8 ring-slate-900/30 ring-1 rounded-full" />
                <span className="relative flexCenter h-4 w-4 sm:w-5 sm:h-5 rounded-full bg-secondary text-white medium-14 -top-2 -left-1">
                  {getTotalCartItems()}
                </span>
              </NavLink>
              {localStorage.getItem('auth-token') ? (
                <button
                  onClick={openModal}
                  className={'btn_secondary_roundedD sm:btn_secondary_rounded flexCenter gap-x-2 text-xs sm:text-base'}
                >
                  <img src={logout} alt="Logout Icon" height={19} width={19} />
                  Logout
                </button>
              ) : (
                <NavLink
                  to={'login'}
                  className={'btn_secondary_roundedD sm:btn_secondary_rounded flexCenter gap-x-2 text-xs sm:text-base'}
                >
                  <img src={user} height={19} width={19}></img>Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal for logout confirmation */}
      <Modal
        isOpen={isModalOpen}
        title="Logout"
        message="Are you sure you want to logout of your account?"
        onConfirm={handleLogout}
        onCancel={closeModal}
      />

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const Modal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
