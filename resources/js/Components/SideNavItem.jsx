import { Link } from "@inertiajs/react";

const SideNavItem = ({ href, active, icon, children }) => {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 group relative
                ${
                    active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                }`}
        >
            <span
                className={`transition-colors duration-200 ${active ? "text-white" : "text-gray-400 group-hover:text-blue-600"}`}
            >
                {icon}
            </span>
            <span>{children}</span>
        </Link>
    );
};

export default SideNavItem;
