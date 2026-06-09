
// src/layouts/CompanyLayout.jsx

import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import Sidebar from "../components/Sidebar";

const companyLinks = [
  { to: "/company/dashboard", label: "Dashboard" },
  { to: "/company/projects", label: "Progetti" },
  { to: "/company/projects/new", label: "Nuovo Progetto" },
  { to: "/company/contracts", label: "Contratti" },
  { to: "/company/profile", label: "Profilo" },
];

export default function CompanyLayout() {
  return (
    <MainLayout>
      <div className="flex">
        <Sidebar links={companyLinks} />
        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </div>
    </MainLayout>
  );
}