import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="mb-lg flex items-center lg:block">
      <button 
        className="lg:hidden mr-4 text-on-surface p-2 rounded-lg hover:bg-surface-container-high transition-colors"
        onClick={toggleSidebar}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Your Tasks</h2>
        <p className="text-on-surface-variant font-body-md text-body-md">Stay focused. Stay productive.</p>
      </div>
    </header>
  );
};

export default Header;
