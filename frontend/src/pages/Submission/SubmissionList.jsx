import { useState } from "react";
import { useEffectOnce } from "react-use";
import { getAllByUser, remove } from "../../services/SubmissionApi";
import { Link, useOutletContext } from "react-router";
import { alertError, alertSuccess, confirm } from "../../libs/alert";
import ModalPreview from "../../components/ModalPreview";

export default function SubmissionList() {
    const { setLoading } = useOutletContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    async function handleSearch(e) {
        e.preventDefault();
        fetchSubmissions();
    }

    async function handleReset(e) {
        e.preventDefault();
        setName('');
        setEmail('');
        setPhone('');
        fetchSubmissions();
    }

    async function fetchSubmissions() {
        try {
            setLoading(true);
            const response = await getAllByUser({ name, email, phone });
            const data = await response.json();

            if (data.errors === null) {
                setSubmissions(data.data);
            } else {
                await alertError(data.errors);
            }
        } catch (error) {
            await alertError("Failed to fetch submissions.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const result = await confirm("Are you sure you want to delete this submission?");

        if (result.isConfirmed) {
            try {
                setLoading(true);
                const response = await remove(id);
                const data = await response.json();

                if (data.errors === null) {
                    await alertSuccess(data.message);
                    fetchSubmissions(); // panggil ulang list
                } else {
                    await alertError(data.errors);
                }
            } catch (err) {
                await alertError("Failed to delete submission.");
            } finally {
                setLoading(false);
            }
        }
    }

    useEffectOnce(() => {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        // Add transition for smooth animation
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';

        function toggleSearchForm() {
            if (searchFormContent.style.maxHeight !== '0px') {
                // Hide the form
                searchFormContent.style.maxHeight = '0px';
                searchFormContent.style.opacity = '0';
                searchFormContent.style.marginTop = '0';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                // Show the form
                searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
                searchFormContent.style.opacity = '1';
                searchFormContent.style.marginTop = '1rem';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        fetchSubmissions();

        return () => {
            toggleButton.removeEventListener('click', toggleSearchForm);
        };
    });

    return (
        <div>
            <div className="flex items-center mb-6">
                <i className="fas fa-users text-blue-400 text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-white">Submissions List</h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <i className="fas fa-search text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold text-white">Search Submissions</h2>
                    </div>
                    <button type="button" id="toggleSearchForm" className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
                        <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
                    </button>
                </div>
                <div id="searchFormContent" className="mt-4">
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label htmlFor="search_name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-gray-500" />
                                    </div>
                                    <input type="text" id="search_name" name="search_name" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="search_email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-envelope text-gray-500" />
                                    </div>
                                    <input type="text" id="search_email" name="search_email" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="search_phone" className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-phone text-gray-500" />
                                    </div>
                                    <input type="text" id="search_phone" name="search_phone" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-right space-x-3">
                            <button
                                type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
                            >
                                <i className="fas fa-search mr-2" /> Search
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
                            >
                                <i className="fas fa-undo mr-2" /> Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
                    <Link to={"/dashboard/submissions/create"} className="block p-6 h-full">
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-user-plus text-3xl text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-3">Create New Submission</h2>
                            <p className="text-gray-300">Add a new submission to your list</p>
                        </div>
                    </Link>
                </div>
                {submissions.map((submission) => (
                    <div key={submission.id}>
                        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in transition-all duration-300 hover:scale-[1.01]">
                            <div className="p-6">
                                <Link
                                    to={`/dashboard/submissions/${submission.id}`}
                                    className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
                                >
                                    <h2 className="text-2xl font-semibold text-white hover:text-blue-300 transition-colors duration-200 mb-4">
                                        {submission.name}
                                    </h2>
                                    <div className="space-y-3 text-gray-300 ml-1">
                                        <p className="flex items-center">
                                            <i className="fas fa-envelope text-gray-500 w-6" />
                                            <span className="font-medium w-20">Email:</span>
                                            <span>{submission.email || "-"}</span>
                                        </p>
                                        <p className="flex items-center">
                                            <i className="fas fa-phone text-gray-500 w-6" />
                                            <span className="font-medium w-20">Phone:</span>
                                            <span>{submission.phone || "-"}</span>
                                        </p>
                                    </div>
                                </Link>

                                {submission.image?.url && (
                                    <div className="mt-6 cursor-pointer group" onClick={() => setShowPreview(true)}>
                                        <div className="relative overflow-hidden rounded-lg border border-gray-700 shadow-md">
                                            <img
                                                src={submission.image.url}
                                                alt={submission.name}
                                                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-all duration-300">
                                                Klik untuk preview
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6 flex justify-end space-x-3">
                                    <Link
                                        to={`/dashboard/submissions/${submission.id}`}
                                        className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                                    >
                                        <i className="fas fa-edit mr-2" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(submission.id)}
                                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                                    >
                                        <i className="fas fa-trash-alt mr-2" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {showPreview && (
                            <ModalPreview
                                isOpen={showPreview}
                                onClose={() => setShowPreview(false)}
                                imageUrl={submission.image.url}
                                title="Preview Image"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}