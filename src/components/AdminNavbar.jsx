
// src/components/admin/AdminNavbar.jsx

import { useAuth } from "../hooks/useAuth";

export default function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center border-b border-gray-700">
      <h1 className="text-lg font-semibold">SkillMatch</h1>

      <div className="flex items-center space-x-4">
        <span className="text-sm">
          👨🏻‍💻 {user?.name} ({user?.role})
        </span>

        <button
          onClick={logout}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-sm rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}