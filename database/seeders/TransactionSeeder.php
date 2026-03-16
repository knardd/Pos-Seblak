<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\SpicyLevel;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil kasir pertama (atau user admin jika kasir tidak ada)
        $cashier = User::where('role', 'cashier')->first() ?? User::first();
        
        // Ambil semua produk dan level pedas
        $products = Product::all();
        $spicyLevels = SpicyLevel::all();

        if ($products->isEmpty() || $spicyLevels->isEmpty()) {
            $this->command->error('Data Produk atau Level Pedas kosong! Silakan isi dulu sebelum menjalankan seeder ini.');
            return;
        }

        $this->command->info('Memulai pembuatan data transaksi dummy untuk 7 hari terakhir...');

        // Loop untuk 7 hari terakhir (termasuk hari ini)
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            
            // Tentukan jumlah transaksi per hari (acak 8 - 15 transaksi agar terlihat ramai)
            $dailyCount = rand(8, 15);

            for ($j = 0; $j < $dailyCount; $j++) {
                // Tentukan jam transaksi (antara jam 11:00 sampai 21:00)
                $transactionTime = $date->copy()->setHour(rand(11, 21))->setMinute(rand(0, 59))->setSecond(rand(0, 59));
                
                // Buat invoice number unik
                $invoiceNumber = 'INV-' . $transactionTime->format('Ymd') . '-' . strtoupper(Str::random(5));

                // 1. Buat Header Transaksi (Data awal, akan diupdate totalnya nanti)
                $transaction = Transaction::create([
                    'invoice_number' => $invoiceNumber,
                    'user_id' => $cashier->id,
                    'subtotal' => 0,
                    'spicy_level_id' => $spicyLevels->random()->id,
                    'total_price' => 0,
                    'payment_method' => rand(0, 1) ? 'cash' : 'qris',
                    'amount_paid' => 0,
                    'change_amount' => 0,
                    'status' => 'completed',
                    'created_at' => $transactionTime,
                    'updated_at' => $transactionTime,
                ]);

                $totalPrice = 0;

                // 2. Tentukan berapa banyak jenis produk dalam satu pesanan (1 - 4 item)
                $itemCount = rand(1, 4);
                $selectedProducts = $products->random($itemCount);

                foreach ($selectedProducts as $product) {
                    $qty = rand(1, 3);
                    $price = $product->price;
                    $subtotal = $price * $qty;

                    TransactionDetail::create([
                        'transaction_id' => $transaction->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price_at_time' => $price,
                        'subtotal' => $subtotal,
                        'created_at' => $transactionTime,
                        'updated_at' => $transactionTime,
                    ]);

                    $totalPrice += $subtotal;
                }

                // 3. Update total di header transaksi
                // Simulasikan pembayaran
                $amountPaid = $totalPrice;
                if ($transaction->payment_method === 'cash') {
                    // Jika cash, bayar dengan uang pas atau lebih (dibulatkan ke 5000/10000 terdekat)
                    $amountPaid = ceil($totalPrice / 5000) * 5000;
                    if ($amountPaid < $totalPrice) $amountPaid += 5000;
                }

                $transaction->update([
                    'subtotal' => $totalPrice,
                    'total_price' => $totalPrice,
                    'amount_paid' => $amountPaid,
                    'change_amount' => $amountPaid - $totalPrice,
                ]);
            }

            $this->command->info("Selesai membuat data untuk tanggal: " . $date->format('Y-m-d'));
        }

        $this->command->info('Berhasil! Data transaksi 7 hari telah siap.');
    }
}
