import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LogIn, User, Lock } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Please enter your details to sign in to Seblak POS
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-sm font-medium text-green-600 border border-green-100 flex items-center">
                    <span className="mr-2">✓</span>
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                        className="text-gray-700 font-semibold mb-1.5"
                    />

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <User size={18} />
                        </div>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <InputError message={errors.name} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-gray-700 font-semibold"
                        />
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="••••••••"
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 text-sm font-bold tracking-wide uppercase flex items-center gap-2"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        ) : (
                            <LogIn size={18} />
                        )}
                        Sign In
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
