<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SpicyLevel as SpicyModel;

class SpicyLevel extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SpicyModel::create([
            'level_name' => 'Level 1',
            'extra_price' => 0
        ]);
        SpicyModel::create([
            'level_name' => 'Level 5',
            'extra_price' => 2000
        ]);
    }
}
