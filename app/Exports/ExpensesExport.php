<?php

namespace App\Exports;

use App\Models\Expense;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ExpensesExport implements FromCollection, WithHeadings, WithMapping
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
        $query = Expense::query();

        if ($this->startDate && $this->endDate) {
            $query->whereBetween('date', [$this->startDate, $this->endDate]);
        }

        return $query->latest('date')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Tanggal',
            'Kategori',
            'Jumlah (Rp)',
            'Catatan',
        ];
    }

    public function map($expense): array
    {
        return [
            $expense->id,
            $expense->date->format('d-m-Y'),
            ucfirst($expense->category),
            $expense->amount,
            $expense->notes,
        ];
    }
}
