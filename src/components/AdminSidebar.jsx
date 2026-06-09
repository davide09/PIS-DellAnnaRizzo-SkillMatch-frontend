
// src/components/admin/AdminSidebar.jsx

import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-800 transition text-sm";

  const activeClass = "bg-gray-800";

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Control Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Tutti gli utenti
        </NavLink>

        <NavLink
          to="/admin/users/pending"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Utenti in attesa
        </NavLink>

        <NavLink
          to="/admin/commission"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Gestione Commissione
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Segnalazioni
        </NavLink>

        <NavLink
          to="/admin/feedback"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Feedback
        </NavLink>

        <NavLink
          to="/admin/contracts"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Contratti
        </NavLink>

        <NavLink
          to="/admin/wallets"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Wallet
        </NavLink>

        <NavLink
          to="/admin/wallets/transactions"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Transazioni Wallet
        </NavLink>

        <NavLink
          to="/admin/wallets/transactions/filter"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Filtra Transazioni
        </NavLink>
      </nav>
    </div>
  );
}