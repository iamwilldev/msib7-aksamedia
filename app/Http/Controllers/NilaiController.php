<?php

namespace App\Http\Controllers;

use App\Models\Nilai;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function nilaiRT()
        {
            $nilaiRT = Nilai::select('nama', 'nisn', 'skor', 'nama_pelajaran')
                ->where('materi_uji_id', 7)
                ->where('nama_pelajaran', '!=', 'Pelajaran Khusus')
                ->get()
                ->groupBy('nama');
    
            $data = [];
            foreach ($nilaiRT as $key => $value) {
                $data[] = [
                    'nama' => $key,
                    'nilaiRt' => $value->mapWithKeys(function ($item) {
                        return [strtolower($item->nama_pelajaran) => $item->skor];
                    }),
                    'nisn' => $value[0]->nisn,
                ];
            }
    
            return response()->json($data);
        }

    public function nilaiST()
    {
        $nilaiST = Nilai::query()
        ->select('nama', 'nisn', 'pelajaran_id', 'skor', 'nama_pelajaran')
        ->where('materi_uji_id', 4)
        ->selectRaw("
            CASE
                WHEN pelajaran_id = 44 THEN skor * 41.67
                WHEN pelajaran_id = 45 THEN skor * 29.67
                WHEN pelajaran_id = 46 THEN skor * 100
                WHEN pelajaran_id = 47 THEN skor * 23.81
                ELSE 0
            END AS nilai
        ")
        ->get()
        ->groupBy('nama')
        ->map(function ($item) {
            return [
                'nama' => $item->first()->nama,
                'nisn' => $item->first()->nisn,
                'nilai' => $item->pluck('nilai', 'nama_pelajaran'), 
                'total' => $item->sum('nilai'),
            ];
        });

        $nilaiST = $nilaiST->sortByDesc('total');

        return response()->json($nilaiST);
    }
}
