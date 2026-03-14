import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import {
    User as UserIcon,
    Lock as LockIcon,
    Utensils as SoupIcon,
    ArrowRight,
    CheckCircle2,
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
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12 m-4 rounded-3xl">
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border-[20px] border-white"></div>
                </div>

                <div className="relative z-10 text-center space-y-8 max-w-md animate-in fade-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-4 group hover:scale-110 transition-transform duration-500">
                        <SoupIcon
                            size={40}
                            className="text-white group-hover:rotate-12 transition-transform"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                            SEBLAK<span className="text-blue-200">KU</span>
                        </h1>
                        <p className="text-blue-100 text-lg font-medium leading-relaxed">
                            Aplikasi Point of Sales modern untuk bisnis kuliner
                            Seblak. Kelola pesanan, stok, dan laporan dalam satu
                            tempat.
                        </p>
                    </div>

                    <div className="pt-8 grid grid-cols-3 gap-4">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <p className="text-white font-black text-lg">
                                Fast
                            </p>
                            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">
                                Orders
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <p className="text-white font-black text-lg">
                                Easy
                            </p>
                            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">
                                Inventory
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <p className="text-white font-black text-lg">
                                Secure
                            </p>
                            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">
                                Reporting
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile Decorative Header */}
                <div className="lg:hidden absolute top-0 left-0 w-full h-48 bg-blue-600 -z-10 rounded-b-[40px]"></div>

                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right duration-500">
                    {/* Brand Logo for Mobile */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600">
                            <SoupIcon size={32} />
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
                                    value="Username Petugas"
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
                                <>Masuk ke Sistem</>
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
