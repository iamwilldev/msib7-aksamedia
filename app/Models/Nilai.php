<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;

    protected $table = 'nilai';
    protected $fillable = [
        'id_status',
        'profil_tes_id',
        'id_siswa',
        'soal_bank_paket_id	',
        'nama',
        'nisn',
        'jk',
        'skor',
        'soal_benar',
        'nama_pelajaran',
        'pelajaran_id',
        'materi_uji_id',
        'sesi',
        'id_pelaksanaan',
        'nama_sekolah',
        'total_soal',
        'urutan'
    ];
}