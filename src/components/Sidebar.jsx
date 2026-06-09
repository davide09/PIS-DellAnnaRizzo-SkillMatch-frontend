
// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <aside className="w-56 bg-white border-r min-h-[calc(100vh-3.5rem)]">
      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}