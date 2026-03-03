<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\SpicyLevel;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        return Inertia::render('Cashier/Index', [
            'products' => Product::with('category')->where('is_active', true)->get(),
            'categories' => Category::all(),
            'levels' => SpicyLevel::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.qty' => 'required|integer|min:1',
            'cart.*.price' => 'required|numeric|min:0',
            'spicy_level_id' => 'required|exists:spicy_levels,id',
            'payment_method' => 'required|in:cash,qris',
            'amount_paid' => 'required|numeric|min:' . $request->total_price,
            'subtotal' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ], [
            'amount_paid.min' => 'Jumlah bayar tidak boleh kurang dari total harga.'
        ]);

        // Validate stock
        foreach ($request->cart as $item) {
            $product = Product::find($item['id']);
            if ($product && $product->stock < $item['qty']) {
                return redirect()->back()->with('error', "Stok {$product->name} tidak cukup (tersedia: {$product->stock})");
            }
        }

        return DB::transaction(function () use ($request) {
            $total_price = $request->total_price;
            $change_amount = $request->amount_paid - $total_price;

            $invoiceNumber = 'INV-' . now()->format('YmdHis') . '-' . str_pad(random_int(1, 999), 3, '0', STR_PAD_LEFT);

            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'invoice_number' => $invoiceNumber,
                'subtotal' => $request->subtotal,
                'spicy_level_id' => $request->spicy_level_id,
                'total_price' => $total_price,
                'payment_method' => $request->payment_method,
                'amount_paid' => $request->amount_paid,
                'change_amount' => $change_amount,
                'status' => 'completed',
            ]);

            foreach ($request->cart as $item) {
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['qty'],
                    'price_at_time' => $item['price'],
                    'subtotal' => $item['price'] * $item['qty'],
                ]);

                // Decrement stock
                Product::where('id', $item['id'])->decrement('stock', $item['qty']);
            }

            return redirect()->back()->with('success', 'Transaksi Berhasil!');
        });
    }
}
