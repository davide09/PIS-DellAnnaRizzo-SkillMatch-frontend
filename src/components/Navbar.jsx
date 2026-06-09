
// src/components/Navbar.jsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-700">SkillMatch</span>
        <span className="text-sm text-slate-500">| Matching aziende & professionisti</span>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="flex flex-col text-right">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-slate-500">{user.role}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}