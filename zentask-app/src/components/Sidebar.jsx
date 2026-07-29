import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    const body = document.querySelector('body');
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        alert('Logging out of ZenTask...');
        body.style.opacity = '1';
    }, 500);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <nav className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-lg px-md shadow-sm z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="mb-xl flex justify-between items-center">
          <h1 className="font-headline-md text-headline-md text-on-surface">ZenTask</h1>
          <button className="lg:hidden text-on-surface" onClick={toggleSidebar}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-sm mb-lg">
          <img 
            className="w-10 h-10 rounded-full object-cover" 
            alt="Alex Johnson"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAog0pV2tklzA1vhFaWP8adoRj4YmuAE0hKICW2irDJNgUclL1mhYY8zB8JED35WLVZpl-8lPwr72QLnx0019DY8dOCeW1u3Y2quEmqpwgyvzDCb6VPGa3gE21l2B8Y1urTzkYNGEoKWZRarGxCpGjwA3jXrhk5qcinRB--W-NMBrKuPfRNNVbthZbYYjw_G-AqJCQSw73Bkj12DXc9oljQxH1lJb_zQFkk3ZqIA-yeiCToTnqAu3i0"
          />
          <div>
            <p className="font-label-md text-label-md text-on-surface">Alex Johnson</p>
            <p className="text-[10px] text-on-surface-variant">Premium Member</p>
          </div>
        </div>

        {/* Main Navigation Items */}
        <div className="flex-1 flex flex-col gap-xs overflow-y-auto custom-scrollbar">
          <a className="flex items-center gap-sm px-sm py-xs text-primary font-bold bg-secondary-container rounded-lg active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">assignment_turned_in</span>
            <span className="font-label-md text-label-md">My Tasks</span>
          </a>
          <a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-label-md text-label-md">Calendar</span>
          </a>
          <a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">folder_open</span>
            <span className="font-label-md text-label-md">Categories</span>
          </a>
          <a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg active:translate-x-1 transition-transform" href="#">
            <span className="material-symbols-outlined">archive</span>
            <span className="font-label-md text-label-md">Archive</span>
          </a>
          <div className="mt-md px-sm">
            <button className="w-full py-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm active:scale-95 transition-all">
              New Project
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto pt-lg border-t border-outline-variant/20 flex flex-col gap-xs">
          <a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-label-md text-label-md">Help</span>
          </a>
          <button 
            className="flex items-center gap-sm px-sm py-md text-on-primary bg-primary rounded-lg transition-all active:scale-95 shadow-sm hover:brightness-110" 
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
