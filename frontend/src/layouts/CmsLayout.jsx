import { Link, Outlet, useLocation } from "react-router";

export default function CmsLayout() {
    const location = useLocation();

    const navItems = [
        { path: "/cms/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
        { path: "/cms/users", label: "Manage Users", icon: "fas fa-users-cog" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100">
            <header className="bg-slate-800/90 backdrop-blur border-b border-gray-700 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link
                        to="/cms/dashboard"
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    >
                        <i className="fas fa-cogs text-blue-400 text-2xl" />
                        <span className="font-bold text-xl tracking-wide text-white">
                            Admin CMS
                        </span>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname.startsWith(item.path)
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                                            }`}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/logout"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all"
                                >
                                    <i className="fas fa-sign-out-alt" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-6 py-8">
                <Outlet />
            </main>

            <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-700">
                <p>© {new Date().getFullYear()} CMS Management System — Admin Panel</p>
            </footer>
        </div>
    );
}
