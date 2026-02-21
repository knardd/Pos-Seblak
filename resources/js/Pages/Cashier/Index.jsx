import React, { useState, useMemo } from "react";
import CategoryTabs from "@/Components/Pos/CategoryTabs";
import SpicyLevelSelector from "@/Components/Pos/SpicyLevelSelector";
import {
    ShoppingCart,
    Printer,
    CheckCircle,
    Utensils,
    Coffee,
    Flame,
    Plus,
    Minus,
    Trash2,
    Search,
} from "lucide-react";

/**
 * Catatan Teknis:
 * Dalam lingkungan produksi Laravel + Inertia, Anda akan menggunakan:
 * import { useForm } from '@inertiajs/react';
 * import ProductCard from '@/Components/Pos/ProductCard';
 * import CartItem from '@/Components/Pos/CartItem';
 * * Untuk keperluan preview ini, komponen-komponen tersebut digabungkan menjadi satu file.
 */

// --- Sub-Komponen: ProductCard ---
const ProductCard = ({ product, onAdd }) => {
    const getBgColor = (cat) => {
        switch (cat) {
            case "topping":
                return "bg-orange-100";
            case "frozen":
                return "bg-blue-100";
            case "drink":
                return "bg-green-100";
            default:
                return "bg-slate-100";
        }
    };

    return (
        <button
            onClick={() => onAdd(product)}
            className={`relative p-5 rounded-2xl border-2 border-transparent hover:border-orange-500 transition-all text-left flex flex-col justify-between h-32 shadow-sm ${getBgColor(product.category)} active:scale-95`}
        >
            <span className="font-bold text-slate-800 leading-tight">
                {product.name}
            </span>
            <div className="flex justify-between items-end">
                <span className="text-sm font-black text-orange-700">
                    Rp {product.price.toLocaleString()}
                </span>
                <div className="bg-white/50 p-1 rounded-lg">
                    <Plus className="w-4 h-4 text-orange-700" />
                </div>
            </div>
        </button>
    );
};

// --- Sub-Komponen: CartItem ---
const CartItem = ({ item, onUpdateQty, onRemove }) => {
    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-start">
                <span className="font-bold text-sm text-slate-700">
                    {item.name}
                </span>
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
                    <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-1 hover:bg-slate-100 rounded text-orange-600"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                        {item.qty}
                    </span>
                    <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1 hover:bg-slate-100 rounded text-orange-600"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <span className="font-black text-slate-800 text-sm">
                    Rp {(item.qty * item.price).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

// --- Komponen Utama: Index ---
export default function App() {
    // Props simulasi (Data asli akan datang dari Laravel Controller)
    const products = [
        { id: 1, name: "Kerupuk Mawar", price: 2000, category: "topping" },
        { id: 2, name: "Sosis Sapi", price: 3000, category: "frozen" },
        { id: 3, name: "Dumpling Keju", price: 4000, category: "frozen" },
        { id: 4, name: "Es Teh Manis", price: 5000, category: "drink" },
        { id: 5, name: "Makaroni", price: 2000, category: "topping" },
        { id: 6, name: "Bakso Aci", price: 5000, category: "topping" },
        { id: 7, name: "Ceker Ayam", price: 3000, category: "topping" },
        { id: 8, name: "Jeruk Peras", price: 7000, category: "drink" },
    ];

    const categories = [
        { id: 1, name: "Topping" },
        { id: 2, name: "Frozen" },
        { id: 3, name: "Drink" },
    ];

    const levels = [
        { id: 1, level_name: "Lvl 0", extra_price: 0 },
        { id: 2, level_name: "Lvl 1", extra_price: 0 },
        { id: 3, level_name: "Lvl 2", extra_price: 2000 },
        { id: 4, level_name: "Lvl 3", extra_price: 4000 },
    ];

    const [activeTab, setActiveTab] = useState("all");
    const [cart, setCart] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(levels[0]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [search, setSearch] = useState("");

    // Filter Produk berdasarkan tab dan pencarian
    const filteredProducts = products.filter((p) => {
        const matchTab = activeTab === "all" || p.category === activeTab;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const subtotal = useMemo(
        () => cart.reduce((acc, item) => acc + item.price * item.qty, 0),
        [cart],
    );
    const total = subtotal + (selectedLevel?.extra_price || 0);

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

    const handleRemoveFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const handleCheckout = () => {
        // Simulasi pengiriman data
        console.log("Simpan Transaksi:", { cart, level: selectedLevel, total });
        setShowSuccess(true);
    };

    return (
        <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans">
            {/* Sisi Kiri: Katalog Produk (Tablet Friendly) */}
            <div className="w-[65%] flex flex-col p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-orange-600 tracking-tight">
                        SEBLAK POS
                    </h1>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari bahan..."
                            className="w-full pl-10 pr-4 py-2 bg-white border-none rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-sm ${activeTab === "all" ? "bg-orange-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.name.toLowerCase())}
                            className={`px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-sm ${activeTab === cat.name.toLowerCase() ? "bg-orange-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={handleAddToCart}
                        />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-400 italic">
                            Produk tidak ditemukan...
                        </div>
                    )}
                </div>
            </div>

            {/* Sisi Kanan: Keranjang (Sidebar Split Screen) */}
            <div className="w-[35%] bg-white shadow-2xl flex flex-col">
                <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
                    <h2 className="text-lg font-black flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-orange-600" />{" "}
                        Pesanan
                    </h2>
                    <button
                        onClick={() => setCart([])}
                        className="text-xs font-bold text-slate-400 hover:text-red-500 tracking-wider transition-colors"
                    >
                        RESET
                    </button>
                </div>

                {/* Area Item Keranjang */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300">
                            <ShoppingCart className="w-16 h-16 mb-2 opacity-20" />
                            <p className="italic">
                                Pilih bahan di sebelah kiri
                            </p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQty={handleUpdateQty}
                                onRemove={handleRemoveFromCart}
                            />
                        ))
                    )}
                </div>

                {/* Pemilih Level Pedas (Ditempatkan Logis Sebelum Checkout) */}
                <div className="p-4 bg-orange-50 border-t border-orange-100">
                    <label className="text-[10px] font-black uppercase text-orange-400 mb-2 block flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Pilih Level Pedas
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {levels.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => setSelectedLevel(l)}
                                className={`py-2 text-xs font-bold rounded-lg border-2 transition-all ${selectedLevel.id === l.id ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-100" : "bg-white text-orange-600 border-orange-200"}`}
                            >
                                {l.level_name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer: Total & Aksi Utama */}
                <div className="p-6 border-t-2 border-slate-50 bg-white">
                    <div className="space-y-1 mb-4">
                        <div className="flex justify-between text-slate-400 text-sm font-bold">
                            <span>SUBTOTAL</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-sm font-bold">
                            <span>BIAYA LEVEL</span>
                            <span>
                                Rp {selectedLevel.extra_price.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-black text-slate-400">
                                TOTAL
                            </span>
                            <span className="text-3xl font-black text-orange-600">
                                Rp {total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                        className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-orange-100 hover:bg-orange-700 active:scale-95 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none flex items-center justify-center gap-3"
                    >
                        <Printer className="w-6 h-6" />
                        BAYAR SEKARANG
                    </button>
                </div>
            </div>

            {/* Modal Sukses (Feedback Visual) */}
            {showSuccess && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-[320px] rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-1">
                            Berhasil!
                        </h3>
                        <p className="text-slate-500 text-sm mb-8">
                            Transaksi telah dicatat dan struk sedang dikirim ke
                            printer.
                        </p>

                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                setCart([]);
                                setSelectedLevel(levels[0]);
                            }}
                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-lg transition-all"
                        >
                            PESANAN BARU
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
}
