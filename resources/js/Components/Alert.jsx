export default function Alert({ type = "success", message }) {
    if (!message) return null;

    const baseStyle = "px-4 py-3 rounded-lg mb-4 text-sm font-medium border";

    const variants = {
        success: "bg-green-100 text-green-700 border-green-300",
        error: "bg-red-100 text-red-700 border-red-300",
    };

    return <div className={`${baseStyle} ${variants[type]}`}>{message}</div>;
}
