<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Employee::query();

            // if ($request->has('name') || $request->has('division_id')) {
            //     $query->whereLike('name', $request->name)->WhereLike('division_id', $request->division_id);
            // }

            $query->when($request->name, function ($q) use ($request) {
                return $q->where('name', 'like', "%$request->name%");
            });

            $query->when($request->division_id, function ($q) use ($request) {
                return $q->where('division_id', $request->division_id);
            });

            $employees = $query->select('id', 'image', 'name', 'phone', 'division_id', 'position')->paginate(2);

            return response(new DefaultResource(true, 'Successfully fetched employees', [
                    'employees' => EmployeeResource::collection($employees),
                ], $employees
            ), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        try {
            $data = $request->validated();

            $employee = Employee::create($data);

            return response(new DefaultResource(true, 'Successfully created employee', $employee), 201);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        try {
            return response(new DefaultResource(true, 'Successfully fetched employee', [
                'employee' => new EmployeeResource($employee),
            ]), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        try {
            $data = $request->validated();

            $employee->update($data);

            return response(new DefaultResource(true, 'Successfully updated employee', [
                'employee' => new EmployeeResource($employee),
            ]), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        try {
            $employee->delete();

            return response(new DefaultResource(true, 'Successfully deleted employee', []), 200);
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }
}
