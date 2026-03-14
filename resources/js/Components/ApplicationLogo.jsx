import { Soup } from "lucide-react";

export default function ApplicationLogo({ className = "", ...props }) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 ${className}`}
        >
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                <Soup size={40} className="text-white" />
            </div>
            <span className="text-2xl font-black text-blue-900 tracking-tight">
                SEBLAKKU
            </span>
        </div>
    );
}
