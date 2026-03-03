<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Category', [
            'categories' => Category::withCount('products')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:categories,name']);
        Category::create($request->only('name'));
        return redirect()->back()->with('success', 'Kategori berhasil dibuat');
    }

    public function update(Request $request, Category $category)
    {
    $request->validate([
        'name' => 'required|string|unique:categories,name,' . $category->id
    ]);

    $category->update([
        'name' => $request->name
    ]);

    return redirect()->back()
        ->with('success', "Kategori '$category->name' berhasil diupdate");
}

    public function destroy(Category $category)
    {
        if ($category->products()->count() > 0) {
            return redirect()->back()->with('error', "$category->name tidak bisa dihapus karena masih memiliki produk");
        }
        $category->delete();
        return redirect()->back()->with('success', "$category->name berhasil dihapus");
    }
}
