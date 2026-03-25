import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { 
  ArrowLeft, Mail, Phone, Globe, Building2, 
  MapPin, Briefcase, AtSign, ExternalLink 
} from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUserById(id).then(setUser).catch(() => navigate('/')).finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50/50">
      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Sleek Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100">
        
        {/* SMALLER HEADER: Height reduced from h-48 to h-32 */}
        <div className="h-32 bg-slate-900 relative">
           {/* AVATAR: Adjusted positioning for smaller banner */}
           <div className="absolute -bottom-10 left-10 p-1.5 bg-white rounded-2xl shadow-lg border border-slate-50">
              <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center text-4xl font-black text-slate-400">
                {user.name.charAt(0)}
              </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 px-10 pb-10">
          
          {/* Info Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-50 pb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <AtSign size={14} className="text-slate-400" />
                <span className="text-slate-500 font-bold text-sm">
                  {user.username.toLowerCase()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <a href={`mailto:${user.email}`} className="p-3 rounded-xl bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all border border-slate-200 shadow-sm">
                <Mail size={18} />
              </a>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all border border-slate-200 shadow-sm">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Clean Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            
            {/* Column 1: Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</h3>
              </div>
              
              <InfoRow icon={Mail} label="Email" value={user.email} />
              <InfoRow icon={Phone} label="Phone" value={user.phone} />
            </div>

            {/* Column 2: Professional */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional</h3>
              </div>
              
              <InfoRow icon={Briefcase} label="Organization" value={user.company.name} />
              <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-slate-500 text-xs leading-relaxed italic">
                "{user.company.catchPhrase}"
              </div>
            </div>

            {/* Column 3: Location */}
            
<div className="space-y-4">
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</h3>
  </div>
  
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
     <div className="flex items-start gap-3">
        <MapPin size={18} className="text-slate-300 mt-1" />
        <div>
          <p className="text-slate-900 font-bold text-sm leading-tight">{user.address.city}</p>
          <p className="text-slate-500 font-medium text-xs mt-1 leading-relaxed">
            {user.address.suite}, {user.address.street}<br />
            Zip: {user.address.zipcode}
          </p>
          
          {/* --- UPDATED WORKING LINK --- */}
          <a 
            href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest transition-colors bg-indigo-50 px-3 py-1.5 rounded-lg w-fit"
          >
            Open Google Maps <ExternalLink size={12} />
          </a>
        </div>
     </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for the rows with CLEAN styling (white background, subtle borders)
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
    <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
      <Icon size={16} />
    </div>
    <div className="overflow-hidden">
      <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter mb-0.5">{label}</p>
      <p className="text-slate-900 font-bold text-sm truncate">{value}</p>
    </div>
  </div>
);

export default UserDetails;