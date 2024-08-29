'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDataContext } from '@/context/data.context';
import logOut from '@/services/auth/signOut';
import { toast } from 'react-toastify';
import AccountInfo from './AccountInfo';

const Navbar = () => {
  const { user } = useDataContext();
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleLogOut = async () => {
    const { message } = await logOut();
    toast.success(message, { toastId: "log out" });
  };

  return (
  <nav id='navbar' className="w-full bg-white text-black shadow-md py-1">
      <div id='navbar-container' className="mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <Image 
            src='/logo.png'
            width={80}
            height={80}
            alt='logo'
          />
        </Link>
        <div className="flex items-center gap-4">
          <div
            className='relative m-4'
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {user ? 
              <div className='flex items-center'>
                <AccountInfo user={user!} />
              </div>
              : (
                <Link href="/account">
                  <button className="p-4 hover:text-gray-bg-light hover:underline hover:decoration-gray-bg-light">
                  Account
                  </button>
                </Link>
              )
            }
            {isHover && user && (
              <div className='overflow-hidden z-50 w-full absolute top-[102%] border rounded-lg border-gray-300 flex flex-col justify-center bg-white text-sm shadow-lg'>
                <button
                  className='p-2 bg-white text-black hover:bg-gray-bg-light hover:text-white duration-200'
                  onClick={handleLogOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;