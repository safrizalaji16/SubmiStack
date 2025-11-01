export default function LoadingOverlay({ loading }) {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-700 border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
                </div>
            </div>

            <div className="mt-6 flex items-center space-x-1">
                <span className="text-white text-lg font-medium">Loading</span>
                <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
            </div>

            <p className="mt-2 text-gray-400 text-sm">Please wait a moment</p>
        </div>
    );
}