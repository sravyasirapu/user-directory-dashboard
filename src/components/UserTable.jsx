import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

const UserTable = ({ users, requestSort, sortConfig }) => {
  const navigate = useNavigate();

  const Th = ({ label, sortKey, sortable = false }) => (
    <th 
      className={`p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
      onClick={() => sortable && requestSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        {sortable && <ArrowUpDown className={`w-4 h-4 ${sortConfig.key === sortKey ? 'text-blue-500' : 'text-gray-300'}`} />}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <Th label="User Name" sortKey="name" sortable />
              <Th label="Email Address" />
              <Th label="Phone Number" />
              <Th label="Company" sortKey="company" sortable />
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr 
                key={user.id} 
                onClick={() => navigate(`/user/${user.id}`)}
                className="hover:bg-blue-50/30 cursor-pointer transition-all group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">{user.email}</td>
                <td className="p-4 text-gray-600 text-sm">{user.phone}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium uppercase tracking-tight">
                    {user.company.name}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;