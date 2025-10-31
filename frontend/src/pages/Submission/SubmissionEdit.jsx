import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { upload } from "../../services/FileApi";
import { alertError, alertSuccess } from "../../libs/alert";
import { get, update } from "../../services/SubmissionApi";
import { useEffectOnce } from "react-use";
import ModalPreview from "../../components/ModalPreview";

export default function SubmissionEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [originalImageId, setOriginalImageId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const reset = () => {
        setImagePreview(null);
        setImage(null);
        setName("");
        setEmail("");
        setPhone("");
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let imageId = originalImageId;

            if (image) {
                const responseUpload = await upload(image);
                const dataUpload = await responseUpload.json();

                if (dataUpload.errors !== null) {
                    await alertError(dataUpload.errors);
                    return;
                }

                imageId = dataUpload.data.id;
            }

            const response = await update(id, { name, email, phone, imageId });
            const data = await response.json();

            if (data.errors === null) {
                reset();
                await alertSuccess(data.message);
                navigate("/dashboard/submissions");
            } else {
                await alertError(data.errors);
            }
        } catch (error) {
            console.error(error);
            await alertError("Failed to update submission. Please try again later.");
        }
    }

    async function fetchSubmission() {
        try {
            const response = await get(id);
            const data = await response.json();

            if (data.errors === null) {
                setName(data.data.name);
                setEmail(data.data.email);
                setPhone(data.data.phone);
                setImagePreview(data.data.image?.url || null);
                setOriginalImageId(data.data.image?.id || null);
            } else {
                await alertError(data.errors);
            }
        } catch (error) {
            console.error(error);
            await alertError("Failed to fetch submission data.");
        }
    }

    useEffectOnce(() => {
        fetchSubmission();
    });

    return (
        <div>
            <div className="flex items-center mb-6">
                <Link
                    to="/dashboard/submissions"
                    className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2" /> Back to Submissions
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-plus text-blue-400 mr-3" /> Edit Submission
                </h1>
            </div>

            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user-tag text-gray-500" />
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
                                    placeholder="Enter email address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                                Phone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-phone text-gray-500" />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter phone number"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block text-gray-300 text-sm font-medium mb-2">
                                Image
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className="w-full flex items-center justify-center px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-600 hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200"
                                >
                                    <i className="fas fa-image text-gray-500 mr-2" />
                                    <span>Choose Image</span>
                                </label>
                            </div>

                            {imagePreview && (
                                <div className="mt-4 flex justify-center">
                                    <div
                                        className="relative group cursor-pointer"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500 shadow-lg transition-transform group-hover:scale-105"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImagePreview(null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                        >
                                            <i className="fas fa-times text-xs" />
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="flex justify-end space-x-4">
                            <Link
                                to="/dashboard/submissions"
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
            <ModalPreview
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl={imagePreview}
                title={name || "Preview Image"}
            />
        </div>
    );
}
