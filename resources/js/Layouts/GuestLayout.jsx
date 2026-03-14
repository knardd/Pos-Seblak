import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4">
            {/* Dekorasi Background Halus */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-50/50 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-50/50 blur-[100px]" />
            </div>

            <div className="w-full max-w-sm">
                <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 rounded-xl relative">
                    {children}
                </div>

                <p className="mt-8 text-center text-gray-400 text-[10px] font-bold tracking-widest uppercase opacity-60">
                    &copy; {new Date().getFullYear()} Seblakku &bull; All rights
                    reserved
                </p>
            </div>
        </div>
    );
}
