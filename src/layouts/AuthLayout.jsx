
// src/layouts/AuthLayout.jsx

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
}