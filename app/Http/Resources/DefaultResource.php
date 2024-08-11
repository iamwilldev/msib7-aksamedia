<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DefaultResource extends JsonResource
{
    public $status, $message, $resource, $pagination;

    /**
     * __construct
     *
     * @param  mixed  $status
     * @param  mixed  $message
     * @param  mixed  $resource
     * @param  mixed  $pagination
     * @return void
     */
    public function __construct($status, $message, $resource, $pagination = null)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
        $this->resource = $resource;
        $this->pagination = $pagination;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $response = [
            'success' => $this->status,
            'message' => $this->message,
            'data' => $this->resource,
        ];

        if ($this->pagination) {
            $response['pagination'] = $this->pagination->toArray();
        }

        return $response;
    }
}
