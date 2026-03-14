<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\SpicyLevel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->filled('start_date') ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->subDays(30)->startOfDay();
        $endDate = $request->filled('end_date') ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfDay();

        // 1. General Summary
        $summary = Transaction::where('transactions.status', 'completed')
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('products', 'transaction_details.product_id', '=', 'products.id')
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->select(
                DB::raw('SUM(transaction_details.subtotal) as total_revenue'),
                DB::raw('SUM(transaction_details.quantity * products.cost_price) as total_cost'),
                DB::raw('COUNT(DISTINCT transactions.id) as total_orders')
            )
            ->first();
        
        // Add expenses to summary
        $totalExpenses = \App\Models\Expense::whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
            ->sum('amount');
        
        if ($summary) {
            $summary->total_expenses = $totalExpenses;
            $summary->total_profit = $summary->total_revenue - $summary->total_cost - $totalExpenses;
            $summary->avg_order_value = $summary->total_orders > 0 ? $summary->total_revenue / $summary->total_orders : 0;
        }

        // 2. Sales Trend (Daily)
        $salesTrend = Transaction::where('transactions.status', 'completed')
            ->join('transaction_details', 'transactions.id', '=', 'transaction_details.transaction_id')
            ->join('products', 'transaction_details.product_id', '=', 'products.id')
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->select(
                DB::raw('DATE(transactions.created_at) as date'),
                DB::raw('SUM(transaction_details.subtotal) as revenue'),
                DB::raw('SUM(transaction_details.quantity * products.cost_price) as cost'),
                DB::raw('COUNT(DISTINCT transactions.id) as orders')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function($item) {
                // Get expenses for this specific day
                $dailyExpense = \App\Models\Expense::where('date', $item->date)->sum('amount');
                $item->expense = $dailyExpense;
                $item->profit = $item->revenue - $item->cost - $dailyExpense;
                return $item;
            });

        // 3. Top Products
        $topProducts = TransactionDetail::select(
                'products.name',
                'categories.name as category_name',
                DB::raw('SUM(transaction_details.quantity) as total_qty'),
                DB::raw('SUM(transaction_details.subtotal) as total_revenue'),
                DB::raw('SUM(transaction_details.quantity * products.cost_price) as total_cost')
            )
            ->join('products', 'transaction_details.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('transactions', 'transaction_details.transaction_id', '=', 'transactions.id')
            ->where('transactions.status', 'completed')
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->groupBy('products.name', 'categories.name')
            ->get()
            ->map(function($item) {
                $item->total_profit = $item->total_revenue - $item->total_cost;
                return $item;
            })
            ->sortByDesc('total_qty')
            ->values()
            ->take(10);

        // 4. Payment Method Breakdown
        $paymentBreakdown = Transaction::where('status', 'completed')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->select('payment_method', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_price) as revenue'))
            ->groupBy('payment_method')
            ->get();

        // 5. Spicy Level Popularity
        $spicyPopularity = Transaction::select(
                'spicy_levels.level_name',
                DB::raw('COUNT(*) as count')
            )
            ->join('spicy_levels', 'transactions.spicy_level_id', '=', 'spicy_levels.id')
            ->where('transactions.status', 'completed')
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->groupBy('spicy_levels.level_name')
            ->orderByDesc('count')
            ->get();

        return Inertia::render('Admin/Report/Index', [
            'summary' => $summary,
            'salesTrend' => $salesTrend,
            'topProducts' => $topProducts,
            'paymentBreakdown' => $paymentBreakdown,
            'spicyPopularity' => $spicyPopularity,
            'filters' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
            ]
        ]);
    }
}
