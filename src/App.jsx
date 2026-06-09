
import AppRouter from "./router/AppRouter";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Caricamento...
      </div>
    );
  }

  return <AppRouter />;
}