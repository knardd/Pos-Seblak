<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate = null, $endDate = null)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        $query = Transaction::with(['user', 'spicyLevel'])->where('status', 'completed');

        if ($this->startDate && $this->endDate) {
            $query->whereBetween('created_at', [$this->startDate . ' 00:00:00', $this->endDate . ' 23:59:59']);
        }

        return $query->latest()->get();
    }

    public function headings(): array
    {
        return [
            'ID Transaksi',
            'No. Invoice',
            'Kasir',
            'Level Pedas',
            'Subtotal',
            'Total Bayar',
            'Metode Pembayaran',
            'Jumlah Bayar',
            'Kembalian',
            'Tanggal',
        ];
    }

    public function map($transaction): array
    {
        return [
            $transaction->id,
            $transaction->invoice_number,
            $transaction->user->name ?? 'N/A',
            $transaction->spicyLevel->level_name ?? 'N/A',
            $transaction->subtotal,
            $transaction->total_price,
            strtoupper($transaction->payment_method),
            $transaction->amount_paid,
            $transaction->change_amount,
            $transaction->created_at->format('d-m-Y H:i'),
        ];
    }
}
