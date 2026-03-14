<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Inventory;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StockManagementController extends Controller
{
    public function index()
    {
        $products = Product::with(['inventory', 'category'])->latest()->get()->map(function($product) {
            $product->stock = $product->inventory->stock ?? 0;
            $product->unit = $product->inventory->unit ?? 'pcs';
            return $product;
        });

        return Inertia::render('Admin/Inventory/Management', [
            'products' => $products
        ]);
    }

    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string|max:20',
            'note' => 'nullable|string|max:255'
        ]);

        DB::transaction(function() use ($validated, $inventory) {
            $oldStock = $inventory->stock;
            $diff = $validated['stock'] - $oldStock;

            $inventory->update([
                'stock' => $validated['stock'],
                'unit' => $validated['unit']
            ]);

            if ($diff != 0) {
                InventoryLog::create([
                    'inventory_id' => $inventory->id,
                    'user_id' => Auth::id(),
                    'type' => $diff > 0 ? 'in' : 'adjustment',
                    'quantity' => $diff,
                    'note' => $validated['note'] ?? 'Penyesuaian stok manual'
                ]);
            }
        });

        return redirect()->back()->with('success', 'Stok berhasil diperbarui');
    }
}
