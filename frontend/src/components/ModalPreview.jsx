export default function ModalPreview({ isOpen, onClose, imageUrl, title }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto rounded-lg shadow-lg"
                />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition-all"
                >
                    <i className="fas fa-times text-xl" />
                </button>
            </div>
        </div>
    );
}
