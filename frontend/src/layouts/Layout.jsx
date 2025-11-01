import { Outlet } from "react-router";
import { useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Layout() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
            <LoadingOverlay loading={loading} />

            <Outlet context={{ setLoading }} />
        </div>
    );
}
