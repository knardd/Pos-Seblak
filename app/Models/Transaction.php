<?php

namespace App\Models;

use App\Models\TransactionDetail;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    protected $fillable = [
        'user_id', 
        'invoice_number', 
        'subtotal', 
        'spicy_level_id', 
        'total_price', 
        'payment_method', 
        'amount_paid', 
        'change_amount', 
        'status'
    ];

    public function details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function spicyLevel(): BelongsTo
    {
        return $this->belongsTo(SpicyLevel::class);
    }
}
