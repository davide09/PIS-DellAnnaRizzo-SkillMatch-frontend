
// src/layouts/ProfessionalLayout.jsx

import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import Sidebar from "../components/Sidebar";

const professionalLinks = [
  { to: "/professional/dashboard", label: "Dashboard" },
  { to: "/professional/matching", label: "Matching" },
  { to: "/professional/contracts", label: "Contratti" },
  { to: "/professional/skills", label: "Skill" },
  { to: "/professional/profile", label: "Profilo" },
];

export default function ProfessionalLayout() {
  return (
    <MainLayout>
      <div className="flex">
        <Sidebar links={professionalLinks} />
        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </div>
    </MainLayout>
  );
}