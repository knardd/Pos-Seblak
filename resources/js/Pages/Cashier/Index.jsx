import React, { useState, useMemo } from "react";
import { router, usePage } from "@inertiajs/react";
import { Soup } from "lucide-react";
import Alert from "@/Components/Alert";
import TopBar from "@/Components/TopBar";
import CategoryTabs from "@/Components/CategoryTabs";
import ProductCard from "@/Components/ProductCard";
import CartSidebar from "@/Components/CartSidebar";
import PaymentModal from "@/Components/PaymentModal";
import SuccessScreen from "@/Components/SuccessScreen";

export default function App({ products = [], categories = [], levels = [], expectedCash = 0 }) {
    const { flash = {}, auth } = usePage().props;
    const isAdmin = auth?.user?.role === "admin";

    const [activeTab, setActiveTab] = useState("all");
    const [cart, setCart] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [search, setSearch] = useState("");
    const [processing, setProcessing] = useState(false);

    // State Payment Modal
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [lastTransaction, setLastTransaction] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [amountPaid, setAmountPaid] = useState("");

    const filteredProducts = products.filter((p) => {
        const categoryName = p.category?.name || p.category || "";
        const matchTab =
            activeTab === "all" || categoryName.toLowerCase() === activeTab;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const subtotal = useMemo(
        () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
        [cart],
    );
    const total = subtotal + Number(selectedLevel?.extra_price || 0);
    const changeAmount = amountPaid ? Number(amountPaid) - total : 0;

    const handleAddToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing)
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item,
                );
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const handleUpdateQty = (id, delta) => {
        setCart((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
            ),
        );
    };

    const handleRemoveFromCart = (id) =>
        setCart((prev) => prev.filter((i) => i.id !== id));

    const submitTransaction = () => {
        if (paymentMethod === "cash" && Number(amountPaid) < total) {
            alert("Uang pembayaran kurang!");
            return;
        }

        setProcessing(true);

        const payload = {
            cart,
            spicy_level_id: selectedLevel?.id,
            payment_method: paymentMethod,
            amount_paid:
                paymentMethod === "cash" ? parseFloat(amountPaid) : total,
            subtotal,
            total_price: total,
        };

        router.post(route("pos.store"), payload, {
            preserveScroll: true,
            onSuccess: () => {
                setLastTransaction({
                    cart: [...cart],
                    total,
                    amountPaid: payload.amount_paid,
                    changeAmount,
                    selectedLevel,
                    paymentMethod: payload.payment_method
                });
                setProcessing(false);
                setShowPaymentModal(false);
                setShowSuccessScreen(true);
                setCart([]);
                setSelectedLevel(null);
                setAmountPaid("");
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    const cartCount = cart.reduce((a, i) => a + i.qty, 0);

    return (
        <div className="flex h-screen w-full bg-[#fdfdfd] overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-700">
            {/* ====== LEFT: Product Area ====== */}
            <div className="flex-1 flex flex-col overflow-hidden relative border-r border-gray-100/60">
                <TopBar
                    search={search}
                    onSearchChange={setSearch}
                    isAdmin={isAdmin}
                    expectedCash={expectedCash}
                />

                <Alert type="error" message={flash?.error} />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <CategoryTabs
                        categories={categories}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar bg-slate-50/30">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2.5">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddToCart}
                                />
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <div className="w-12 h-12 bg-gray-50/50 rounded-xl flex items-center justify-center mb-3 border border-gray-100">
                                    <Soup className="w-6 h-6 text-gray-200" />
                                </div>
                                <span className="text-[11px] font-bold tracking-tight text-gray-500">Menu tidak ditemukan</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ====== RIGHT: Cart Sidebar ====== */}
            <CartSidebar
                cart={cart}
                levels={levels}
                selectedLevel={selectedLevel}
                onLevelChange={setSelectedLevel}
                onUpdateQty={handleUpdateQty}
                onRemove={handleRemoveFromCart}
                onResetCart={() => {
                    setCart([]);
                    setSelectedLevel(null);
                }}
                onPayClick={() => setShowPaymentModal(true)}
                subtotal={subtotal}
                total={total}
                processing={processing}
            />

            {/* PAYMENT MODAL */}
            <PaymentModal
                isOpen={showPaymentModal}
                total={total}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                amountPaid={amountPaid}
                onAmountPaidChange={setAmountPaid}
                changeAmount={changeAmount}
                onConfirm={submitTransaction}
                onClose={() => setShowPaymentModal(false)}
                processing={processing}
            />

            {/* Success Animation Screen */}
            <SuccessScreen
                isOpen={showSuccessScreen}
                onClose={() => setShowSuccessScreen(false)}
                transactionData={lastTransaction}
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
