<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            // Relasi ke user (kasir yang bertugas)
            $table->foreignId('user_id')->constrained(); 
            $table->string('invoice_number')->unique(); // Contoh: INV-20231025-001
            
            $table->decimal('subtotal', 12, 2);
            $table->foreignId('spicy_level_id')->constrained();
            $table->decimal('total_price', 12, 2);
            
            $table->enum('payment_method', ['cash', 'qris']);
            $table->decimal('amount_paid', 12, 2); // Uang yang dikasih pelanggan
            $table->decimal('change_amount', 12, 2); // Kembalian
            
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('completed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
