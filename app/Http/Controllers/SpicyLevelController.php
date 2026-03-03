<?php

namespace App\Http\Controllers;

use App\Models\SpicyLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpicyLevelController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Level', [
            'spicyLevels' => SpicyLevel::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'level_name' => 'required|string|unique:spicy_levels,level_name',
            'extra_price' => 'required|numeric|min:0',
        ]);
        SpicyLevel::create($validated);
        return redirect()->back()->with('success', 'Level Pedas berhasil dibuat');
    }

    public function destroy(SpicyLevel $spicyLevel)
    {
        $spicyLevel->delete();
        return redirect()->back()->with('success', "$spicyLevel->level_name berhasil dihapus");
    }
}
