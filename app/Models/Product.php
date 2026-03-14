<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Inventory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'price', 'cost_price', 'is_active'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function inventory(): HasOne
    {
        return $this->hasOne(Inventory::class);
    }

    // Helper to get stock and unit easily
    public function getStockAttribute()
    {
        return $this->inventory ? $this->inventory->stock : 0;
    }

    public function getUnitAttribute()
    {
        return $this->inventory ? $this->inventory->unit : 'pcs';
    }
}
