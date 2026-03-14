<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $today = Carbon::today();
        $thisMonthStart = Carbon::now()->startOfMonth();

        // Stats Today
        $totalTransactionHariIni = Transaction::whereDate('created_at', $today)->count();
        $totalPendapatanHariIni = Transaction::whereDate('created_at', $today)
            ->where('status', 'completed')
            ->sum('total_price');

        // Stats Monthly
        $totalPendapatanBulanIni = Transaction::where('created_at', '>=', $thisMonthStart)
            ->where('status', 'completed')
            ->sum('total_price');
        $totalTransaksiBulanIni = Transaction::where('created_at', '>=', $thisMonthStart)->count();

        // Inventory Alerts - Use Join for better performance with large data
        $lowStockProducts = Product::join('inventories', 'products.id', '=', 'inventories.product_id')
            ->where('inventories.stock', '<=', DB::raw('inventories.low_stock_threshold'))
            ->where('products.is_active', true)
            ->with(['category', 'inventory'])
            ->orderBy('inventories.stock', 'asc')
            ->select('products.*')
            ->get()->map(function($product) {
                // Mapping back for consistency
                $product->stock = $product->inventory->stock ?? 0;
                $product->unit = $product->inventory->unit ?? 'pcs';
                return $product;
            });

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
            'totalPendapatanBulanIni' => $totalPendapatanBulanIni,
            'totalTransaksiBulanIni' => $totalTransaksiBulanIni,
            'totalProdukTerjualHariIni' => $totalProdukTerjualHariIni,
            'lowStockProducts' => $lowStockProducts,
            'topProducts' => $topProducts,
            'chartData' => $chartData,
        ]);
    }
}
