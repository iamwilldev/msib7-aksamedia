<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DefaultResource extends JsonResource
{
    public $status, $message, $resource;

    /**
     * __construct
     *
     * @param  mixed  $status
     * @param  mixed  $message
     * @param  mixed  $resource
     * @return void
     */
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'success' => $this->status,
            'message' => $this->message,
            'data' => $this->resource,
        ];
    }
}
