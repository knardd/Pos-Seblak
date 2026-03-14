<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Expense/Index', [
            'expenses' => Expense::with('user')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
        ]);

        $validated['user_id'] = Auth::id();

        Expense::create($validated);

        return redirect()->back()->with('success', 'Pengeluaran berhasil dicatat.');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
        return redirect()->back()->with('success', 'Catatan pengeluaran berhasil dihapus.');
    }
}
