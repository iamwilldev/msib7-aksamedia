<?php

namespace Database\Seeders;

use App\Models\Division;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisionNames = [
            'Mobile Apps',
            'QA',
            'Full Stack',
            'Backend',
            'Frontend',
            'UI/UX Designer',
        ];

        foreach ($divisionNames as $name) {
            Division::create(['name' => $name]);
        }
    }
}
