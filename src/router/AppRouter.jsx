
// src/router/AppRouter.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// === LAYOUTS ===
import AuthLayout from "../layouts/AuthLayout";
import CompanyLayout from "../layouts/CompanyLayout";
import ProfessionalLayout from "../layouts/ProfessionalLayout";
import AdminLayout from "../layouts/AdminLayout";

// === PAGINE GLOBALI ===
import Welcome from "../pages/Welcome";

// === AUTH ===
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// === SEGNALAZIONE/REPORT ===
import ReportCreate from "../pages/report/ReportCreate";

// === COMPANY ===
import CompanyDashboard from "../pages/company/CompanyDashboard";
import ProjectsList from "../pages/company/ProjectsList";
import ProjectCreate from "../pages/company/ProjectCreate";
import ProjectDetails from "../pages/company/ProjectDetails";
import ContractsListCompany from "../pages/company/ContractsList";
import CompanyContractDetails from "../pages/company/ContractDetails";
import CompanyProfile from "../pages/company/Profile";

// === PROFESSIONAL ===
import ProfessionalDashboard from "../pages/professional/ProfessionalDashboard";
import MatchingSuggestions from "../pages/professional/MatchingSuggestions";
import ContractsListProfessional from "../pages/professional/ContractsList";
import ProfessionalContractDetails from "../pages/professional/ContractDetails";
import SkillsEditor from "../pages/professional/SkillsEditor";
import ProfessionalProfile from "../pages/professional/Profile";

// === ADMIN ===
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminUserFeedback from "../pages/admin/AdminUserFeedback";
import AdminUsersPending from "../pages/admin/AdminUsersPending";
import AdminContracts from "../pages/admin/AdminContracts";
import AdminWallets from "../pages/admin/AdminWallets";
import AdminCommissionConfig from "../pages/admin/AdminCommissionConfig";
import AdminReports from "../pages/admin/AdminReports";
import AdminUserReports from "../pages/admin/AdminUserReports"; 
import AdminReportDetails from "../pages/admin/AdminReportDetails";
import AdminWalletTransactions from "../pages/admin/AdminWalletTransactions";
import AdminWalletTransactionsFilter from "../pages/admin/AdminWalletTransactionsFilter";

// === WALLET (per PROFESSIONAL / COMPANY) ===
import MyWallet from "../pages/wallet/MyWallet";
import MyTransactions from "../pages/wallet/MyTransactions";

// === GUARDIE ===
import PrivateRoute from "./PrivateRoute";
import RoleGuard from "./RoleGuard";

export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Caricamento...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* HOMEPAGE */}
        <Route
          path="/"
          element={
            !user ? (
              <Welcome />
            ) : (
              <Navigate
                to={
                  user.role === "ADMIN"
                    ? "/admin/dashboard"
                    : user.role === "COMPANY"
                    ? "/company/dashboard"
                    : "/professional/dashboard"
                }
                replace
              />
            )
          }
        />

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : (
                <Navigate
                  to={
                    user.role === "ADMIN"
                      ? "/admin/dashboard"
                      : user.role === "COMPANY"
                      ? "/company/dashboard"
                      : "/professional/dashboard"
                  }
                  replace
                />
              )
            }
          />

          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />

        </Route>

        {/* ======================================
            ADMIN AREA
        ====================================== */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleGuard role="ADMIN">
                <AdminLayout />
              </RoleGuard>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/pending" element={<AdminUsersPending />} />

          <Route path="commission" element={<AdminCommissionConfig />} />

          <Route path="reports" element={<AdminReports />} />

          <Route path="reports/:id" element={<AdminReportDetails />} />

          <Route path="feedback" element={<AdminUserFeedback />} />
          <Route path="users/:id/feedback" element={<AdminUserFeedback />} />

          <Route path="users/:id/reports" element={<AdminUserReports />} />

          <Route path="contracts" element={<AdminContracts />} />
          
          <Route path="wallets" element={<AdminWallets />} />
          <Route path="wallets/transactions" element={<AdminWalletTransactions />} />
          <Route path="wallets/transactions/filter" element={<AdminWalletTransactionsFilter />} />
        </Route>

        {/* ======================================
            COMPANY AREA
        ====================================== */}
        <Route
          path="/company"
          element={
            <PrivateRoute>
              <RoleGuard role="COMPANY">
                <CompanyLayout />
              </RoleGuard>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectCreate />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          <Route path="contracts" element={<ContractsListCompany />} />
          <Route path="contracts/:contractId" element={<CompanyContractDetails />} />

          <Route path="profile" element={<CompanyProfile />} />

          <Route path="report/:id" element={<ReportCreate />} />

          {/* WALLET COMPANY */}
          <Route path="wallet" element={<MyWallet />} />
          <Route path="wallet/transactions" element={<MyTransactions />} />
        </Route>

        {/* ======================================
            PROFESSIONAL AREA
        ====================================== */}
        <Route
          path="/professional"
          element={
            <PrivateRoute>
              <RoleGuard role="PROFESSIONAL">
                <ProfessionalLayout />
              </RoleGuard>
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<ProfessionalDashboard />} />
          <Route path="matching" element={<MatchingSuggestions />} />
          <Route path="contracts" element={<ContractsListProfessional />} />
          <Route path="contracts/:contractId" element={<ProfessionalContractDetails />} />
          <Route path="skills" element={<SkillsEditor />} />

          <Route path="profile" element={<ProfessionalProfile />} />

          <Route path="report/:id" element={<ReportCreate />} />

          {/* WALLET PROFESSIONAL */}
          <Route path="wallet" element={<MyWallet />} />
          <Route path="wallet/transactions" element={<MyTransactions />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}