<?php

namespace App\Http\Controllers;

use App\Models\CashierClosing;
use App\Models\Transaction;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class CashierClosingController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        
        // 1. Total Tunai dari Penjualan (Hanya hari ini)
        $cashSales = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->where('payment_method', 'cash')
            ->sum('total_price');

        // 2. Total Pengeluaran Tunai (Belanja bumbu/gas hari ini dari laci)
        $cashExpenses = Expense::whereDate('date', $today)
            ->sum('amount');

        // 3. Ekspektasi Uang Tunai di Laci
        $expectedCash = $cashSales - $cashExpenses;

        // 4. Total QRIS
        $totalQris = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->where('payment_method', 'qris')
            ->sum('total_price');

        return Inertia::render('Admin/Closing/Index', [
            'expectedCash' => $expectedCash,
            'totalQris' => $totalQris,
            'history' => CashierClosing::with('user')->latest()->take(10)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'total_cash_reported' => 'required|numeric|min:0',
            'notes' => 'nullable|string'
        ]);

        $today = Carbon::today();
        
        $cashSales = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->where('payment_method', 'cash')
            ->sum('total_price');

        $cashExpenses = Expense::whereDate('date', $today)
            ->sum('amount');

        $totalCashSystem = $cashSales - $cashExpenses;
        $totalQris = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->where('payment_method', 'qris')
            ->sum('total_price');

        $difference = $request->total_cash_reported - $totalCashSystem;

        CashierClosing::create([
            'user_id' => Auth::id(),
            'total_cash_system' => $totalCashSystem,
            'total_cash_reported' => $request->total_cash_reported,
            'total_qris' => $totalQris,
            'difference' => $difference,
            'notes' => $request->notes,
        ]);

        return redirect()->back()->with('success', 'Penutupan kasir berhasil dicatat!');
    }
}
