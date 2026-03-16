import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import {
    User as UserIcon,
    Lock as LockIcon,
    Utensils,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Package,
    ShieldCheck,
} from "lucide-react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen w-full flex bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
            <Head title="Log in" />
            {/* LEFT SIDE: DECORATIVE */}
            <div
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-11 m-4 rounded-3xl"
                style={{
                    background: "#1447C2",
                    minHeight: "520px",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                {/* Dot grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* TOP ROW: logo + badge */}
                <div className="relative z-10 flex items-start justify-between">
                    <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center"
                        style={{
                            background: "rgba(255,255,255,0.12)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            width: 52,
                            height: 52,
                        }}
                    >
                        <Utensils size={22} className="text-white" />
                    </div>
                    <div
                        className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide"
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            color: "rgba(255,255,255,0.75)",
                        }}
                    >
                        Point of Sales · 2026
                    </div>
                </div>

                {/* MID: headline */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div
                            className="h-[1.5px] w-5"
                            style={{ background: "rgba(255,255,255,0.35)" }}
                        />
                        <span
                            className="text-[11px] font-medium tracking-[.12em] uppercase"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                            Seblakku POS System
                        </span>
                    </div>

                    <h1
                        className="font-black leading-none tracking-tight mb-5 text-white"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: 52,
                        }}
                    >
                        Satu
                        <br />
                        Tempat,
                        <br />
                        <span
                            style={{
                                color: "rgba(255,255,255,0.4)",
                                fontStyle: "italic",
                            }}
                        >
                            Semua
                        </span>
                        <br />
                        Terkendali.
                    </h1>

                    <div
                        className="w-10 h-0.5 rounded mb-5"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                    />

                    <p
                        className="text-sm leading-relaxed max-w-[310px]"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        Kelola{" "}
                        <span
                            style={{
                                color: "rgba(255,255,255,0.85)",
                                fontWeight: 500,
                            }}
                        >
                            pesanan, stok, dan laporan
                        </span>{" "}
                        bisnis kuliner seblakmu dengan lebih cepat dan akurat.
                    </p>
                </div>
            </div>{" "}
            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile Decorative Header */}
                <div className="lg:hidden absolute top-0 left-0 w-full h-48 bg-blue-600 -z-10 rounded-b-[40px]"></div>

                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-500">
                    {/* Brand Logo for Mobile */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600">
                            <Utensils size={32} />
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            Selamat Datang Kembali!
                        </h2>
                        <p className="text-gray-500 text-sm font-medium mt-2">
                            Silahkan masuk untuk mengelola terminal kasir Anda.
                        </p>
                    </div>

                    {status && (
                        <div className="p-4 rounded-2xl bg-emerald-50 text-xs font-bold text-emerald-600 border border-emerald-100 flex items-center gap-3">
                            <CheckCircle2 size={16} />
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Username"
                                    className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-1.5 ml-1"
                                />

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                        <UserIcon size={18} />
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full pl-11 pr-4 py-3 text-sm bg-white border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 shadow-sm border"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Ketik username Anda"
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-[10px] font-bold px-1"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5 ml-1">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-gray-500 font-black text-[10px] uppercase tracking-widest"
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                        <LockIcon size={18} />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full pl-11 pr-4 py-3 text-sm bg-white border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-300 shadow-sm border"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Ketik password Anda"
                                    />
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-[10px] font-bold px-1"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 text-sm font-black uppercase tracking-widest disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="inline-block animate-spin h-5 w-5 border-[3px] border-white border-t-transparent rounded-full"></span>
                            ) : (
                                <>Masuk</>
                            )}
                        </button>
                    </form>

                    <div className="pt-8 text-center border-t border-gray-50">
                        <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                            &copy; {new Date().getFullYear()} Seblakku &bull;
                            All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
