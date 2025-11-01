import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";
import { getAll as getSubmissions } from "../../services/SubmissionApi";
import { alertError } from "../../libs/alert";
import { getAllUsers } from "../../services/UserApi";

export default function AdminDashboard() {
    const { setLoading } = useOutletContext();
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        totalUsers: 0,
    });

    async function fetchStats() {
        try {
            setLoading(true);
            
            const responseSubmissions = await getSubmissions();
            const dataSubmissions = await responseSubmissions.json();

            if (!dataSubmissions.errors) {
                setStats(prev => ({
                    ...prev,
                    totalSubmissions: dataSubmissions.data?.length || 0,
                }));
            } else {
                await alertError(dataSubmissions.errors);
            }

            const responseUsers = await getAllUsers();
            const dataUsers = await responseUsers.json();

            if (!dataUsers.errors) {
                setStats(prev => ({
                    ...prev,
                    totalUsers: dataUsers.data?.length || 0,
                }));
            } else {
                await alertError(dataUsers.errors);
            }
        } catch (error) {
            console.error(error);
            await alertError("Failed to fetch admin stats.");
        } finally {
            setLoading(false);
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
                    to="/cms/users"
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
