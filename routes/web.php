<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CreateCashierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpicyLevelController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('login');
})->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/cashier', [PosController::class, 'index'])->name('pos.index');
    Route::post('/cashier', [PosController::class, 'store'])->name('pos.store');
});

Route::middleware('auth', 'role:admin')->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/admin/product', [ProductController::class, 'index'])->name('product.index');
    Route::post('/admin/product', [ProductController::class, 'store'])->name('product.store');
    Route::put('/admin/product/{product}',[ProductController::class, 'update'])->name('product.update');
    Route::delete('/admin/product/{product}', [ProductController::class, 'destroy'])->name('product.destroy');

    Route::get('/admin/category', [CategoryController::class, 'index'])->name('category.index');
    Route::post('/admin/category', [CategoryController::class, 'store'])->name('category.store');
    Route::put('/admin/category/{category}',[CategoryController::class, 'update'])->name('category.update');
    Route::delete('/admin/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

    Route::get('/admin/spicy-level', [SpicyLevelController::class, 'index'])->name('spicy.level.index');
    Route::post('/admin/spicy-level', [SpicyLevelController::class, 'store'])->name('spicy.level.store');
    Route::delete('/admin/spicy-level/{level}', [SpicyLevelController::class, 'destroy'])->name('spicy.level.destroy');

    Route::get('/admin/cashier', [CreateCashierController::class, 'index'])->name('cashier.index');
    Route::post('/admin/cashier', [CreateCashierController::class, 'store'])->name('cashier.store');
    Route::put('/admin/cashier/{user}', [CreateCashierController::class, 'update'])->name('cashier.update');
    Route::delete('/admin/cashier/{user}', [CreateCashierController::class, 'destroy'])->name('cashier.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
