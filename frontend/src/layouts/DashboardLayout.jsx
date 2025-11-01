import { Link, Outlet } from "react-router";
import { useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

export default function DashboardLayout() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col relative">
            <LoadingOverlay loading={loading} />

            <header className="bg-gradient shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link
                        to="/dashboard/submissions"
                        className="flex items-center hover:opacity-90 transition-opacity duration-200"
                    >
                        <i className="fas fa-address-book text-white text-2xl mr-3" />
                        <div className="text-white font-bold text-xl">
                            Submission Management
                        </div>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link
                                    to="/dashboard/users/profile"
                                    className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
                                >
                                    <i className="fas fa-user-circle mr-2" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/logout"
                                    className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
                                >
                                    <i className="fas fa-sign-out-alt mr-2" />
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <Outlet context={{ setLoading }} />

                <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
                    <p>© 2025 Submission Management. All rights reserved.</p>
                </div>
            </main>
        </div>
    );
}
