import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAll, getAll as getSubmissions } from "../../services/SubmissionApi";
import { alertError } from "../../libs/alert";
import { getAllUsers } from "../../services/UserApi";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        totalUsers: 0,
    });

    async function fetchStats() {
        try {
            const responseSubmisions = await getAll();
            const dataSubmisions = await responseSubmisions.json();

            if (dataSubmisions.errors === null) {
                setStats({
                    ...stats,
                    totalSubmissions: dataSubmisions.data.length,
                });
            } else {
                await alertError(dataSubmisions.errors);
            }

            const responseUsers = await getAllUsers({ role: ['admin', 'superAdmin', 'user'] });
            const dataUsers = await responseUsers.json();

            if (dataUsers.errors === null) {
                setStats({
                    ...stats,
                    totalUsers: dataUsers.data.length,
                });
            } else {
                await alertError(dataUsers.errors);
            }
        } catch (error) {
            console.log(error);

            await alertError("Failed to fetch admin stats.");
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div>
            <div className="flex items-center mb-6">
                <i className="fas fa-tachometer-alt text-blue-400 text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 flex flex-col items-center justify-center text-center card-hover animate-fade-in">
                    <i className="fas fa-file-alt text-blue-400 text-4xl mb-3" />
                    <h2 className="text-3xl font-bold text-white">{stats.totalSubmissions}</h2>
                    <p className="text-gray-300 mt-1">Total Submissions</p>
                </div>

                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 flex flex-col items-center justify-center text-center card-hover animate-fade-in">
                    <i className="fas fa-users text-green-400 text-4xl mb-3" />
                    <h2 className="text-3xl font-bold text-white">{stats.totalUsers}</h2>
                    <p className="text-gray-300 mt-1">Total Users</p>
                </div>
            </div>

            {/* Manage Users */}
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 text-center animate-fade-in hover:scale-[1.02] transition-all duration-200">
                <Link
                    to="/dashboard/users"
                    className="flex flex-col items-center justify-center"
                >
                    <i className="fas fa-user-cog text-yellow-400 text-4xl mb-3" />
                    <h2 className="text-xl font-semibold text-white">Manage Users</h2>
                    <p className="text-gray-300 mt-1">View and manage all users</p>
                </Link>
            </div>
        </div>
    );
}
