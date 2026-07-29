import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const user = useAuthStore((state) => state.user);
  const updateProfilePicture = useAuthStore((state) => state.updateProfilePicture);
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleFileUpload = async (event) => {
    try {
      setError(null);
      setUploading(true);
      
      const file = event.target.files[0];
      if (!file) return;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      // Update User Metadata
      const { error: updateError } = await updateProfilePicture(data.publicUrl);
      
      if (updateError) {
        throw updateError;
      }
      
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="lg:ml-64 p-xl max-w-[1200px] transition-all duration-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-xl flex flex-col items-center gap-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Your Profile</h1>
          
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-primary/5 border-4 border-surface shadow-sm">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[64px]">person</span>
              </div>
            )}
            
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-white animate-spin">progress_activity</span>
              </div>
            )}
          </div>
          
          <div className="w-full flex flex-col items-center">
            <label 
              htmlFor="profile-upload" 
              className={`cursor-pointer bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md shadow-sm hover:brightness-110 active:scale-95 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              Upload Profile Picture
            </label>
            <input 
              id="profile-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>

          {error && (
            <div className="text-error bg-error-container/20 px-sm py-xs rounded-md text-sm mt-2 text-center w-full">
              {error}
            </div>
          )}
          
          <div className="w-full mt-4 pt-4 border-t border-surface-container-low text-center">
            <p className="text-on-surface-variant text-sm">{user?.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
