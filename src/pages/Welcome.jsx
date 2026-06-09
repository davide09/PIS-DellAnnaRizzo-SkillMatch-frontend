
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Welcome() {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">SkillMatch</h1>

        {user ? (
          <Link
            to={`/${user.role.toLowerCase()}/dashboard`}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Vai alla Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Accedi
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Registrati
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-4xl font-bold text-gray-900 max-w-3xl leading-snug">
          La piattaforma che connette <span className="text-indigo-700">Aziende</span> e{" "}
          <span className="text-indigo-700">Professionisti</span> per micro-progetti e consulenze rapide.
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mt-5">
          Candidature, matching intelligente, contratti digitali, pagamenti automatici
          e gestione reputazione — tutto in un'unica piattaforma.
        </p>

        {/* Pulsante INFO */}
        <button
          className="mt-8 px-8 py-3 bg-indigo-100 text-indigo-700 rounded-lg text-lg hover:bg-indigo-200 transition shadow"
          onClick={() => setShowInfo(!showInfo)}
        >
          ℹ {showInfo ? "Nascondi info" : "Come funziona SkillMatch?"}
        </button>

        {/* SEZIONE INFO ESPANDIBILE */}
        {showInfo && (
          <div className="mt-10 bg-white border rounded-xl shadow p-8 max-w-3xl text-left">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Come funziona SkillMatch?
            </h3>

            <ul className="space-y-4 text-gray-700 leading-relaxed">

              <li>
                👉 <strong>Aziende</strong> pubblicano micro-progetti con requisiti chiari.
              </li>

              <li>
                👉 <strong>Professionisti</strong> si candidano in base alle loro competenze certificate.
              </li>

              <li>
                👉 La piattaforma genera un <strong>contratto digitale</strong> interpretando le decisioni di entrambe le parti.
              </li>

              <li>
                👉 Al termine, il sistema gestisce <strong>pagamento, commissioni e fatturazione</strong> automaticamente.
              </li>

              <li>
                👉 Entrambe le parti lasciano un <strong>feedback</strong> che aggiorna il livello di reputazione del professionista.
              </li>

              <li>
                👉 In casi di comportamenti scorretti, è possibile inviare una <strong>segnalazione</strong> che l’amministratore può analizzare.
              </li>

            </ul>
          </div>
        )}

        {!user && (
          <Link
            to="/register"
            className="mt-12 px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 shadow"
          >
            Inizia ora
          </Link>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-24 py-8 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} SkillMatch — Tutti i diritti riservati.
      </footer>
    </div>
  );
}