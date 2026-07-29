import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const handleLogout = async () => {
    const body = document.querySelector('body');
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(async () => {
        const { supabase } = await import('../lib/supabase');
        await supabase.auth.signOut();
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

        {/* Main Content Area - Empty to push footer down */}
        <div className="flex-1"></div>

        {/* Footer Navigation */}
        <div className="mt-auto pt-lg border-t border-outline-variant/20 flex flex-col gap-xs">
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
