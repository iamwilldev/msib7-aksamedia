<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'divisions';
    protected $fillable = [
        'name',
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'division_id');
    }
}