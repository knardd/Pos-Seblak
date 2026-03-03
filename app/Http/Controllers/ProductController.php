<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Product', [
            'products' => Product::with('category')->latest()->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Menyimpan produk baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        Product::create($validated);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Memperbarui status aktif/stok secara cepat
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $product->update($validated);

        return redirect()->back()->with('success', "Produk $product->name berhasil diperbarui");
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back()->with('success', "$product->name berhasil dihapus");
    }
}
