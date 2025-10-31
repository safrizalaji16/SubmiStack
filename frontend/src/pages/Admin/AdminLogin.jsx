import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../libs/alert";
import { adminLogin } from "../../services/AuthApi";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token", "");
    const [role, setRole] = useLocalStorage("role", "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await adminLogin({ email, password });
            const data = await response.json();

            if (data.errors === null) {
                setToken(data.data.token);
                setRole(data.data.role);
                await alertSuccess(data.message || "Login successful!");
                navigate("/cms/dashboard");
            } else {
                await alertError(data.errors || data.message || "Login failed!");
            }
        } catch (err) {
            await alertError("Server error, please try again later.");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-gray-800">
            <div className="animate-fade-in bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-blue-600 rounded-full mb-4 shadow-lg">
                        <i className="fas fa-user-shield text-3xl text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin CMS</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage the system</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-gray-500" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-60 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Enter your admin email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-500" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-60 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
                        >
                            <i className="fas fa-sign-in-alt mr-2" /> Sign In
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        <p>For authorized administrators only.</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
