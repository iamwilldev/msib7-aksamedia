<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = Division::pluck('id');

        foreach ($divisions as $division) {
            Employee::factory(5)->create([
                'division_id' => $division,
            ]);
        }
    }
}
