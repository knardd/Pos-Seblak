export default function Alert({ type = "success", message }) {
    if (!message) return null;

    const baseStyle =
        "p-3 rounded-lg mb-4 text-sm font-semibold border flex items-center gap-2 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2";

    const variants = {
        success: "bg-emerald-50 text-emerald-700 border-emerald-100",
        error: "bg-rose-50 text-rose-700 border-rose-100",
    };

    return (
        <div className={`${baseStyle} ${variants[type]}`}>
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/50 flex items-center justify-center text-[10px]"></span>
            {message}
        </div>
    );
}
