import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Deletion States
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // Editable Form Inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zipCode, setZipCode] = useState("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const userEmail = user.email || "";
      const metadata = user.user_metadata || {};
      const metaName = metadata.name || userEmail.split("@")[0];
      
      const standardDate = user.created_at 
        ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "Recent";

      setProfile({
        name: metaName,
        email: userEmail,
        joinDate: standardDate,
      });

      // Load extended custom user metadata attributes
      setName(metaName);
      setPhone(metadata.phone || "");
      setStreetAddress(metadata.streetAddress || "");
      setCity(metadata.city || "");
      setStateCode(metadata.stateCode || "");
      setZipCode(metadata.zipCode || "");
      
      setLoading(false);
    };

    fetchUserData();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  const handleUpdateProfile = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name field cannot be left blank.");

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          name: name.trim(),
          phone: phone.trim(),
          streetAddress: streetAddress.trim(),
          city: city.trim(),
          stateCode: stateCode.trim().toUpperCase(),
          zipCode: zipCode.trim()
        }
      });

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, name: name.trim() } : null);
      alert("Profile settings updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      alert(err.message || "Could not update settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAccountDeletion = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDeleteError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("No authenticated user session found.");

      // Verify identity using login credentials
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: deletePassword,
      });

      if (authError) throw new Error("Incorrect validation password.");

      // Invoke remote database cleanup protocol
      const { error: delError } = await supabase.rpc('delete_user_account');
      if (delError) throw delError;

      await supabase.auth.signOut();
      navigate("/");
    } catch (err: any) {
      setDeleteError(err.message || "Failed to remove account parameters.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="text-center py-32 text-gray-500 font-medium">
        Loading profile details...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-32 pb-24 min-h-[80vh] bg-slate-50/60">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side Sidebar Overview Panel */}
        <div className="w-full md:w-80 bg-white rounded-2xl border border-gray-200/60 p-6 shadow-xs flex flex-col gap-6 sticky top-28">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl uppercase shadow-xs flex-shrink-0">
              {profile?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-gray-900 truncate capitalize">{profile?.name}</h2>
              <p className="text-xs text-gray-400 truncate mt-0.5">{profile?.email}</p>
            </div>
          </div>
          
          <div className="h-[1px] bg-gray-100" />
          
          <div className="flex flex-col gap-3 text-xs font-medium text-gray-500 px-1">
            <div className="flex justify-between items-center">
              <span>Member Since</span>
              <span className="font-semibold text-gray-800">{profile?.joinDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Account Status</span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold text-[10px] tracking-wide uppercase border border-emerald-100">Verified</span>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100" />

          <nav className="flex flex-col gap-1 text-sm font-semibold">
            <span className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xs cursor-default">
              Account Settings
            </span>
          </nav>
          
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-xs font-bold text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
          >
            Sign Out of Account
          </button>
        </div>

        {/* Right Side Complex Information Form Control */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          <form onSubmit={handleUpdateProfile} className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-xs flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Profile Configuration</h1>
              <p className="text-xs text-gray-400 mt-1">Manage your personal information, shipping address, and account settings.</p>
            </div>

            {/* Section 1: Core Personal Metrics */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-gray-50 pb-2">1. Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all capitalize text-gray-800 font-medium"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all text-gray-800 font-medium"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Registered Email Address</label>
                <input 
                  type="email" 
                  disabled 
                  value={profile?.email || ""} 
                  className="p-3 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl text-sm cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Section 2: Core Logistics Metric Values */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-gray-50 pb-2">2. Shipping & Logistics Coordinates</h3>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Street Address</label>
                <input 
                  type="text" 
                  value={streetAddress} 
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all text-gray-800 font-medium"
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">City</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all text-gray-800 font-medium"
                    placeholder="New York"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">State</label>
                  <input 
                    type="text" 
                    maxLength={2}
                    value={stateCode} 
                    onChange={(e) => setStateCode(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all uppercase text-gray-800 font-medium"
                    placeholder="NY"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Postal Zip Code</label>
                  <input 
                    type="text" 
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-900 transition-all text-gray-800 font-medium"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <button 
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xs cursor-pointer disabled:bg-gray-300"
              >
                {isSaving ? "Saving Metrics..." : "Save Configuration"}
              </button>

              {/* Clean Account Termination Accordion Anchor Entry Point */}
              {!isDeleting && (
                <button 
                  type="button"
                  onClick={() => setIsDeleting(true)}
                  className="text-xs font-semibold text-gray-400 hover:text-red-500 hover:underline transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              )}
            </div>
          </form>

          {/* Collapsible Administrative Deletion Controller Layout */}
          {isDeleting && (
            <div className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-xs flex flex-col gap-4 animate-fadeIn">
              <div>
                <h2 className="text-base font-bold text-gray-900">Account Removal Verification</h2>
                <p className="text-xs text-gray-400 mt-0.5">To completely wipe your parameters and credentials, confirm your identity password below.</p>
              </div>
              
              <form onSubmit={handleAccountDeletion} className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1.5">
                  <input 
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none text-gray-800"
                    placeholder="Type password"
                    required
                  />
                  {deleteError && <p className="text-red-500 text-xs font-bold mt-1 px-1">✕ {deleteError}</p>}
                </div>
                
                <div className="flex gap-3">
                  <button type="submit" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-red-700 active:scale-[0.98] transition-all shadow-xs">
                    Delete Account
                  </button>
                  <button type="button" onClick={() => { setIsDeleting(false); setDeleteError(""); setDeletePassword(""); }} className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-gray-200 transition-all">
                    Dismiss
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;