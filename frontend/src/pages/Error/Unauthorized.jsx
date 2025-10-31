export default function Unauthorized() {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
        </div>
    );
}
