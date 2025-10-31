import { useState } from "react";
import { useEffectOnce } from "react-use";
import { getAllUsers, remove } from "../../services/UserApi";
import { alertError, alertSuccess, confirm } from "../../libs/alert";
import { Link } from "react-router";

export default function UserList() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    async function handleSearch(e) {
        e.preventDefault();
        fetchUsers();
    }

    async function handleReset(e) {
        e.preventDefault();
        setName('');
        setEmail('');
        fetchUsers();
    }

    async function fetchUsers() {
        const response = await getAllUsers();
        const data = await response.json();

        if (data.errors === null) {
            setUsers(data.data);
        } else {
            await alertError(data.errors);
        }
    }

    async function handleDelete(id) {
        const result = await confirm("Are you sure you want to delete this user?");

        if (result.isConfirmed) {
            try {
                const response = await remove(id);
                const data = await response.json();

                if (data.errors === null) {
                    await alertSuccess(data.message);
                    fetchUsers();
                } else {
                    await alertError(data.errors);
                }
            } catch (err) {
                await alertError("Failed to delete user.");
            }
        }
    }

    useEffectOnce(() => {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        // Animasi buka/tutup form pencarian
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';

        function toggleSearchForm() {
            if (searchFormContent.style.maxHeight !== '0px') {
                searchFormContent.style.maxHeight = '0px';
                searchFormContent.style.opacity = '0';
                searchFormContent.style.marginTop = '0';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
                searchFormContent.style.opacity = '1';
                searchFormContent.style.marginTop = '1rem';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        fetchUsers();

        return () => {
            toggleButton.removeEventListener('click', toggleSearchForm);
        };
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
                    <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                </div>

                <Link
                    to="/cms/users/create"
                    className="flex items-center px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 font-medium shadow-lg transition-all duration-200"
                >
                    <i className="fas fa-user-plus mr-2" /> Create User
                </Link>
            </div>


            {/* Search form */}
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <i className="fas fa-search text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold text-white">Search Users</h2>
                    </div>
                    <button type="button" id="toggleSearchForm" className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
                        <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
                    </button>
                </div>
                <div id="searchFormContent" className="mt-4">
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="search_name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="search_name"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Search by name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="search_email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-envelope text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="search_email"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Search by email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-right space-x-3">
                            <button
                                type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 font-medium shadow-lg"
                            >
                                <i className="fas fa-search mr-2" /> Search
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 font-medium shadow-lg"
                            >
                                <i className="fas fa-undo mr-2" /> Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* User cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">{user.name}</h2>
                            <p className="text-gray-300 mb-2">
                                <i className="fas fa-envelope text-gray-500 mr-2" />
                                {user.email}
                            </p>
                            <p className="text-gray-300 mb-2">
                                <i className="fas fa-user-tag text-gray-500 mr-2" />
                                Role: <span className="capitalize">{user.role?.name || 'N/A'}</span>
                            </p>

                            <div className="mt-5 flex justify-end space-x-3">
                                <Link
                                    to={`/cms/users/${user.id}`}
                                    className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-500 font-medium shadow-md flex items-center"
                                >
                                    <i className="fas fa-edit mr-2" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:ring-2 focus:ring-red-500 font-medium shadow-md flex items-center"
                                >
                                    <i className="fas fa-trash-alt mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
