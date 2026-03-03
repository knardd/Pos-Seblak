import React, { useState, useMemo } from "react";
import { router, usePage } from "@inertiajs/react";
import Alert from "@/Components/Alert";
import TopBar from "@/Components/TopBar";
import CategoryTabs from "@/Components/CategoryTabs";
import ProductCard from "@/Components/ProductCard";
import CartSidebar from "@/Components/CartSidebar";
import PaymentModal from "@/Components/PaymentModal";
import SuccessScreen from "@/Components/SuccessScreen";

export default function App({ products = [], categories = [], levels = [] }) {
    const { flash = {}, auth } = usePage().props;
    const isAdmin = auth?.user?.role === "admin";

    const [activeTab, setActiveTab] = useState("all");
    const [cart, setCart] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(levels[0] || null);
    const [search, setSearch] = useState("");
    const [processing, setProcessing] = useState(false);

    // State Payment Modal
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
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
                setProcessing(false);
                setShowPaymentModal(false);
                setShowSuccessScreen(true);
                setCart([]);
                setAmountPaid("");
            },
            onError: () => {
                setProcessing(false);
            },
        });
    };

    const cartCount = cart.reduce((a, i) => a + i.qty, 0);

    return (
        <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans">
            {/* ====== LEFT: Product Area ====== */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar
                    search={search}
                    onSearchChange={setSearch}
                    isAdmin={isAdmin}
                />

                <Alert type="error" message={flash?.error} />

                <CategoryTabs
                    categories={categories}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto px-6 py-3 custom-scrollbar">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={handleAddToCart}
                            />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-slate-400 italic text-sm">
                            Produk tidak ditemukan...
                        </div>
                    )}
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
                onResetCart={() => setCart([])}
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
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                @keyframes scale-in {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .scale-in-center { animation: scale-in 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
            `}</style>
        </div>
    );
}
