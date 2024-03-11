<?php

namespace App\Http\Requests\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'time' => 'required|date_format:H:i:s',
            'constraint_time' => 'required|date_format:H:i:s',
            'course_id' => 'required|exists:courses,id',
            'passing_score' => 'required|numeric|between:0,100'
        ];
    }
}
