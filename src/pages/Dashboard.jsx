import React, { useEffect, useState, useMemo } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown, 
  Building2, Mail, Phone, Users, User2 
} from 'lucide-react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    userService.getUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  const processedUsers = useMemo(() => {
    let filtered = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => {
      let vA = sortConfig.key === 'company' ? a.company.name : a[sortConfig.key];
      let vB = sortConfig.key === 'company' ? b.company.name : b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (vA > vB ? 1 : -1) : (vA < vB ? 1 : -1);
    });
    return filtered;
  }, [users, searchTerm, sortConfig]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="p-1.5 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                <Users size={18} />
             </div>
             <span className="text-indigo-600 font-bold text-xs tracking-widest uppercase">Admin Panel</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Team Members</h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text"
            className="pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl w-full md:w-96 shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium"
            placeholder="Search by name or email..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* The Table Card */}
      <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 border-b border-indigo-700">
                <th 
                  className="px-8 py-5 group cursor-pointer transition-colors hover:bg-indigo-700" 
                  onClick={() => setSortConfig({key:'name', direction: sortConfig.direction==='asc'?'desc':'asc'})}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-50 uppercase tracking-[0.15em]">
                    <User2 size={14} className="text-indigo-300" />
                    Name 
                    {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={12} className="opacity-40" />}
                  </div>
                </th>
                <th className="px-6 py-5 text-xs font-black text-indigo-50 uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-2"><Mail size={14} className="text-indigo-300" /> Email</div>
                </th>
                <th className="px-6 py-5 text-xs font-black text-indigo-50 uppercase tracking-[0.15em]">
                  <div className="flex items-center gap-2"><Phone size={14} className="text-indigo-300" /> Phone</div>
                </th>
                <th 
                  className="px-6 py-5 group cursor-pointer transition-colors hover:bg-indigo-700" 
                  onClick={() => setSortConfig({key:'company', direction: sortConfig.direction==='asc'?'desc':'asc'})}
                >
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-50 uppercase tracking-[0.15em]">
                    <Building2 size={14} className="text-indigo-300" />
                    Company 
                    {sortConfig.key === 'company' ? (sortConfig.direction === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>) : <ArrowUpDown size={12} className="opacity-40" />}
                  </div>
                </th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {processedUsers.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="table-row-transition group hover:bg-indigo-50/30 cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</div>
                        <div className="text-xs text-slate-400 font-medium tracking-tight">@{user.username.toLowerCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-600 text-sm font-medium">{user.email}</td>
                  <td className="px-6 py-6 text-slate-500 text-sm font-medium">{user.phone}</td>
                  <td className="px-6 py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-tighter group-hover:border-indigo-200 group-hover:bg-white transition-all">
                      {user.company.name}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;