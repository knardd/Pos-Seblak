<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
    $today = Carbon::today();

    $totalTransactionHariIni = Transaction::whereDate('created_at', $today)->count();

    $totalPendapatanHariIni = Transaction::whereDate('created_at', $today)
        ->where('status', 'completed')
        ->sum('total_price');

    // Kalau belum ada detail table, pakai subtotal saja
    $totalProdukTerjualHariIni = TransactionDetail::join(
        'transactions',
        'transaction_details.transaction_id',
        '=',
        'transactions.id'
    )
    ->whereDate('transactions.created_at', $today)
    ->where('transactions.status', 'completed')
    ->sum('transaction_details.quantity');

    $topProducts = TransactionDetail::select(
        'products.name',
        DB::raw('SUM(transaction_details.quantity) as total_sold')
    )
    ->join('products', 'transaction_details.product_id', '=', 'products.id')
    ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
    ->whereDate('transactions.created_at', $today)
    ->where('transactions.status', 'completed')
    ->groupBy('products.name')
    ->orderByDesc('total_sold')
    ->limit(5)
    ->get();

    // Data 7 hari terakhir untuk chart
    $chartData = Transaction::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as total_transaction'),
            DB::raw("SUM(CASE WHEN status = 'completed' THEN total_price ELSE 0 END) as total_income")
        )
        ->where('created_at', '>=', Carbon::now()->subDays(6))
        ->groupBy('date')
        ->orderBy('date')
        ->get();

    return Inertia::render('Admin/Dashboard', [
        'totalTransactionHariIni' => $totalTransactionHariIni,
        'totalPendapatanHariIni' => $totalPendapatanHariIni,
        'totalProdukTerjualHariIni' => $totalProdukTerjualHariIni,
        'topProducts' => $topProducts,
        'chartData' => $chartData,
    ]);
    }
}
