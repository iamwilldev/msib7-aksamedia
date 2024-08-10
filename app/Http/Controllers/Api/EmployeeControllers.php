<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DefaultResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $employees = Employee::select('id', 'image', 'name', 'phone', 'division_id', 'position')->paginate(2);

            return (new DefaultResource(true, 'Successfully fetched employees', [
                'employees' => $employees->map(function ($employee) {
                    return [
                        'id' => $employee->id,
                        'image' => $employee->image,
                        'name' => $employee->name,
                        'phone' => $employee->phone,
                        'division' => [
                            'id' => $employee->division->id,
                            'name' => $employee->division->name,
                        ],
                        'position' => $employee->position,
                    ];
                })->all(),
            ],
            ))->additional([
                'pagination' => $employees->toArray(),
            ])->response()->setStatusCode(200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        dd($request->all());
        // try {
        //     $employees = Employee::whereLike('name', $request->name)->select('id', 'image', 'name', 'phone', 'division_id', 'position')->get();

        //     return response(new DefaultResource(true, 'Successfully fetched employees', [
        //         'employees' => $employees->map(function ($employee) {
        //             return [
        //                 'id' => $employee->id,
        //                 'image' => $employee->image,
        //                 'name' => $employee->name,
        //                 'phone' => $employee->phone,
        //                 'division' => [
        //                     'id' => $employee->division->id,
        //                     'name' => $employee->division->name,
        //                 ],
        //                 'position' => $employee->position,
        //             ];
        //         })->all(),
        //     ],
        //     ), 200);
        // }  catch (\Throwable $e) {
        //     return response(new DefaultResource(false, $e->getMessage(), []), 500);
        // }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
