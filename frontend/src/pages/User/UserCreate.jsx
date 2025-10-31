import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { alertError, alertSuccess } from "../../libs/alert";
import { createUser } from "../../services/UserApi";

export default function UserCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // default role

    const reset = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await createUser({ name, email, password, role });
        const data = await response.json();

        if (data.errors === null) {
            reset();
            await alertSuccess(data.message || "User created successfully!");
            navigate("/cms/users");
        } else {
            await alertError(data.errors);
        }
    }

    return (
        <div>
            <div className="flex items-center mb-6">
                <Link
                    to="/cms/users"
                    className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2" /> Back to Users
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New User
                </h1>
            </div>

            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-5">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter full name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
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
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-5">
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
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="mb-6">
                            <label htmlFor="role" className="block text-gray-300 text-sm font-medium mb-2">
                                Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user-tag text-gray-500" />
                                </div>
                                <select
                                    id="role"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">Super Admin</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <Link
                                to="/cms/users"
                                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 flex items-center shadow-md"
                            >
                                <i className="fas fa-times mr-2" /> Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium shadow-lg flex items-center"
                            >
                                <i className="fas fa-user-plus mr-2" /> Create User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
