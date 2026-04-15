import { useState } from "react";
import Login from "./components/Login";
import { useEffect } from "react";
import EmiCalculator from "./components/EmiCalculator";
import SipCalculator from "./components/SipCalculator";
import EmiVsSipComparison from "./components/EmiVsSipComparison";
import AiAdvisor from "./components/AiAdvisor";
import ErrorBoundary from "./components/ErrorBoundary";
import { MdDashboard } from "react-icons/md";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="app-shell">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="dashboard">
          <header className="dashboard-header">
            <div>
              <h1><MdDashboard className="dashboard-icon" /> Finance Dashboard</h1>
              <p>Use the calculators to compare loan repayment and investment compounding separately, and get AI recommendations for your finances.</p>
            </div>
            <button
              className="logout-button"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
              }}
            >
              Logout
            </button>
          </header>

          <div className="grid-two">
            <ErrorBoundary>
              <EmiCalculator />
            </ErrorBoundary>
            <ErrorBoundary>
              <SipCalculator />
            </ErrorBoundary>
          </div>

          <ErrorBoundary>
            <EmiVsSipComparison />
          </ErrorBoundary>
          <ErrorBoundary>
            <AiAdvisor />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}

export default App;
