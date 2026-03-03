import { useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Alert from "@/Components/Alert";
import { Trash2, SquarePen, Plus } from "lucide-react";

const Product = ({ products, categories }) => {
    const { flash } = usePage().props;

    const [modal, setModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        category_id: "",
        name: "",
        price: "",
        stock: "",
        unit: "",
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingProduct(null);
        reset();
        setModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setData({
            category_id: product.category_id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            unit: product.unit,
            is_active: product.is_active,
        });
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setEditingProduct(null);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingProduct) {
            put(route("product.update", editingProduct.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route("product.store"), {
                onSuccess: () => {
                    closeModal();
                    reset();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Yakin hapus produk?")) {
            router.delete(route("product.destroy", id));
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Alert type="success" message={flash?.success} />
            <Alert type="error" message={flash?.error} />

            <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                    Manajemen Produk
                </h2>

                <button
                    onClick={openCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow"
                >
                    <span className="flex items-center gap-2">
                        <Plus />
                        Tambah Produk
                    </span>
                </button>

                {/* MODAL */}
                {modal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-bold mb-4 text-blue-600">
                                {editingProduct
                                    ? "Edit Produk"
                                    : "Tambah Produk"}
                            </h2>

                            <form
                                onSubmit={submit}
                                className="grid grid-cols-2 gap-4"
                            >
                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className="col-span-2 p-2 border rounded-xl"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    placeholder="Nama Produk"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="col-span-2 p-2 border rounded-xl"
                                />

                                <input
                                    type="number"
                                    placeholder="Harga"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="p-2 border rounded-xl"
                                />

                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    className="p-2 border rounded-xl"
                                />

                                <input
                                    type="text"
                                    placeholder="Unit"
                                    value={data.unit}
                                    onChange={(e) =>
                                        setData("unit", e.target.value)
                                    }
                                    className="p-2 border rounded-xl"
                                />

                                <select
                                    value={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.value === "true",
                                        )
                                    }
                                    className="p-2 border rounded-xl"
                                >
                                    <option value="true">Aktif</option>
                                    <option value="false">Nonaktif</option>
                                </select>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold"
                                >
                                    {editingProduct
                                        ? "Update Produk"
                                        : "Tambah Produk"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TABLE */}
                <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-50 text-blue-700">
                                <th className="p-3 text-left">Nama</th>
                                <th className="p-3 text-left">Kategori</th>
                                <th className="p-3">Harga</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Unit</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-t hover:bg-blue-50"
                                >
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">
                                        {product.category?.name}
                                    </td>
                                    <td className="p-3 text-center">
                                        {product.price}
                                    </td>
                                    <td className="p-3 text-center">
                                        {product.stock}
                                    </td>
                                    <td className="p-3 text-center">
                                        {product.unit}
                                    </td>
                                    <td className="p-3 text-center">
                                        {product.is_active
                                            ? "Aktif"
                                            : "Nonaktif"}
                                    </td>
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                openEditModal(product)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <SquarePen size={16} />
                                                Edit
                                            </span>
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Trash2 size={16} />
                                                Delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div className="text-center text-gray-400 py-6">
                            Belum ada produk
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Product.layout = (page) => <AuthenticatedLayout children={page} />;
export default Product;
