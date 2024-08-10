<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Muhammad Muqtafin Nuha',
            'username' => 'admin',
            'email' => 'iamapinn.dev@gmail.com',
            'phone' => '081334631320',
            'password' => bcrypt('pastibisa'),
        ]);
    }
}
