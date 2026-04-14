import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col justify-between">

        <div>
          <h1 className="text-2xl font-bold mb-10 text-gradient">MediSync</h1>

          <nav className="space-y-4">
            <Link to="/dashboard" className="block hover:text-blue-400">
              🏠 Dashboard
            </Link>

            <Link to="/appointments" className="block hover:text-blue-400">
              📅 Appointments
            </Link>
          </nav>
        </div>

        <button onClick={handleLogout} className="btn-danger">
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}