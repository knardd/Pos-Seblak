import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
            <div className="w-full max-w-md">
                <div className="overflow-hidden bg-white/95 backdrop-blur-sm px-8 py-10 shadow-2xl rounded-3xl border border-white/20">
                    {children}
                </div>

                <p className="mt-8 text-center text-blue-100 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Seblak POS. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
}
