<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DefaultResource;
use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function show(Request $request)
    {
        try {
            if ($request->has('name')) {
                $divisions = Division::whereLike('name', $request->name)->select('id', 'name')->get();

                return response(new DefaultResource(true, 'Successfully fetched divisions', [
                    'divisions' => $divisions,
                ]), 200);
            } else {
                $divisions = Division::select('id', 'name')->paginate(2);

                return (new DefaultResource(true, 'Successfully fetched divisions', $divisions->items(),
                ))->additional([
                    'pagination' => $divisions->toArray(),
                ])->response()->setStatusCode(200);
            }
        } catch (\Throwable $e) {
            return response(new DefaultResource(false, $e->getMessage(), []), 500);
        }
    }
}
