import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import { get, update } from "../../services/UserApi";
import { alertError, alertSuccess } from "../../libs/alert";

export default function UserEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    const reset = () => {
        setName("");
        setEmail("");
        setRole("user");
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await update(id, { name, email, role });
            const data = await response.json();

            if (data.errors === null) {
                await alertSuccess(data.message);
                reset();
                navigate("/dashboard/users");
            } else {
                await alertError(data.errors);
            }
        } catch (error) {
            console.error(error);
            await alertError("Failed to update user. Please try again later.");
        }
    }

    async function fetchUser() {
        try {
            const response = await get(id);
            const data = await response.json();

            if (data.errors === null) {
                setName(data.data.name);
                setEmail(data.data.email);
                setRole(data.data.role?.name || "user");
            } else {
                await alertError(data.errors);
            }
        } catch (error) {
            console.error(error);
            await alertError("Failed to fetch user data.");
        }
    }

    useEffectOnce(() => {
        fetchUser();
    });

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
                    <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit User
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
                                    name="name"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter name"
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
                                    name="email"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    <i className="fas fa-user-shield text-gray-500" />
                                </div>
                                <select
                                    id="role"
                                    name="role"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
                            >
                                <i className="fas fa-times mr-2" /> Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
                            >
                                <i className="fas fa-save mr-2" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
