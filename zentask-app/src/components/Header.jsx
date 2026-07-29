import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Header = ({ toggleSidebar }) => {
  const user = useAuthStore((state) => state.user);
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <header className="mb-lg flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="lg:hidden mr-4 text-on-surface p-2 rounded-lg hover:bg-surface-container-high transition-colors"
          onClick={toggleSidebar}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Your Tasks</h2>
          <p className="text-on-surface-variant font-body-md text-body-md hidden sm:block">Stay focused. Stay productive.</p>
        </div>
      </div>
      
      <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 overflow-hidden hover:ring-2 hover:ring-primary transition-all">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="material-symbols-outlined text-primary">person</span>
        )}
      </Link>
    </header>
  );
};

export default Header;
