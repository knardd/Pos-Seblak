import { Link } from "@inertiajs/react";

const SideNavItem = ({ href, active, icon, children }) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                ${
                    active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
        >
            <span
                className={`transition-colors ${active ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
            >
                {icon}
            </span>
            {children}
            {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
            )}
        </Link>
    );
};

export default SideNavItem;
