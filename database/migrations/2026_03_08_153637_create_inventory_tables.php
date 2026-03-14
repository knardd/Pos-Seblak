<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create inventories table
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('stock')->default(0);
            $table->string('unit')->default('pcs');
            $table->integer('low_stock_threshold')->default(10);
            $table->timestamps();
        });

        // 2. Create inventory_logs table
        Schema::create('inventory_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inventory_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('type', ['in', 'out', 'adjustment', 'cancellation'])->default('adjustment');
            $table->integer('quantity'); // Change amount (+ or -)
            $table->string('note')->nullable();
            $table->timestamps();
        });

        // 3. Migrate data from products to inventories
        $products = DB::table('products')->get();
        foreach ($products as $product) {
            DB::table('inventories')->insert([
                'product_id' => $product->id,
                'stock' => $product->stock ?? 0,
                'unit' => $product->unit ?? 'pcs',
                'low_stock_threshold' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 4. Remove columns from products
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['stock', 'unit']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back columns to products
        Schema::table('products', function (Blueprint $table) {
            $table->integer('stock')->default(0);
            $table->string('unit')->default('pcs');
        });

        // Restore data
        $inventories = DB::table('inventories')->get();
        foreach ($inventories as $inventory) {
            DB::table('products')->where('id', $inventory->product_id)->update([
                'stock' => $inventory->stock,
                'unit' => $inventory->unit,
            ]);
        }

        Schema::dropIfExists('inventory_logs');
        Schema::dropIfExists('inventories');
    }
};
