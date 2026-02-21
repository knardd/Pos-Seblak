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
            'products' => Product::where('is_active', true)->get(),
            'categories' => Category::all(),
            'levels' => SpicyLevel::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'spicy_level_id' => 'required',
            'payment_method' => 'required|string',
            'amount_paid' => 'required|numeric',
        ]);

        return DB::transaction(function () use ($request) {
            $total_price = $request->total_price;
            $change_amount = $request->amount_paid - $total_price;

            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'invoice_number' => 'INV-' . now()->format('YmdHis'),
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
            }

            return redirect()->back()->with('success', 'Transaksi Berhasil!');
        });
    }
}
