<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashierClosing extends Model
{
    protected $fillable = [
        'user_id', 
        'total_cash_system', 
        'total_cash_reported', 
        'total_qris', 
        'difference', 
        'notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
