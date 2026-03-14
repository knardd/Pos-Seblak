<?php

namespace App\Http\Controllers;

use App\Models\InventoryLog;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class InventoryController extends Controller
{
    public function logs(Request $request)
    {
        $query = InventoryLog::with(['inventory.product', 'user']);

        // Filter Produk
        if ($request->filled('product_id')) {
            $query->whereHas('inventory', function($q) use ($request) {
                $q->where('product_id', $request->product_id);
            });
        }

        // Filter Tipe
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter Tanggal
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [
                Carbon::parse($request->start_date)->startOfDay(),
                Carbon::parse($request->end_date)->endOfDay(),
            ]);
        }

        $logs = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Inventory/Logs', [
            'logs' => $logs,
            'products' => Product::orderBy('name')->get(),
            'filters' => $request->only(['product_id', 'type', 'start_date', 'end_date']),
        ]);
    }
}
