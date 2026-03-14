<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Product;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with(['user', 'spicyLevel', 'details.product.category', 'details.product.inventory']);

        // Filter Tanggal
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [
                Carbon::parse($request->start_date)->startOfDay(),
                Carbon::parse($request->end_date)->endOfDay(),
            ]);
        }

        // Filter Payment Method
        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        // Filter Status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search Invoice
        if ($request->filled('search')) {
            $query->where('invoice_number', 'like', '%' . $request->search . '%');
        }

        $orders = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders,
            'filters' => $request->only(['start_date', 'end_date', 'payment_method', 'status', 'search']),
        ]);
    }

    /**
     * Membatalkan pesanan dan mengembalikan stok
     */
    public function destroy(Transaction $transaction)
    {
        if ($transaction->status === 'cancelled') {
            return redirect()->back()->with('error', 'Pesanan ini sudah dibatalkan sebelumnya.');
        }

        return DB::transaction(function () use ($transaction) {
            // Kembalikan stok untuk setiap produk
            foreach ($transaction->details as $detail) {
                $product = $detail->product;
                if ($product && $product->inventory) {
                    $product->inventory->increment('stock', $detail->quantity);

                    // Log the inventory restoration
                    InventoryLog::create([
                        'inventory_id' => $product->inventory->id,
                        'user_id' => Auth::id(),
                        'type' => 'cancellation',
                        'quantity' => $detail->quantity,
                        'note' => "Pembatalan: " . $transaction->invoice_number
                    ]);
                }
            }

            // Update status transaksi
            $transaction->update(['status' => 'cancelled']);

            return redirect()->back()->with('success', "Pesanan {$transaction->invoice_number} berhasil dibatalkan dan stok telah dikembalikan.");
        });
    }
}
