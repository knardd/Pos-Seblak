<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Inventory;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Product', [
            'products' => Product::with(['category'])->latest()->get(),
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
            'cost_price' => 'required|numeric|min:0',
            'is_active' => 'required|boolean',
        ]);

        DB::transaction(function() use ($validated) {
            $product = Product::create([
                'category_id' => $validated['category_id'],
                'name' => $validated['name'],
                'price' => $validated['price'],
                'cost_price' => $validated['cost_price'],
                'is_active' => $validated['is_active'],
            ]);

            // Create initial empty inventory
            Inventory::create([
                'product_id' => $product->id,
                'stock' => 0,
                'unit' => 'pcs',
            ]);
        });

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Memperbarui informasi produk
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'cost_price' => 'required|numeric|min:0',
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
