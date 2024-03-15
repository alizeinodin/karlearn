<?php

namespace App\Http\Requests\AttendQuiz;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ResponseToExamRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'answer' => 'required|array',
            'answer.0' => 'required|exists:questions,id',
            'answer.1' => 'exists:questions,id',
            'answer.2' => 'exists:questions,id',
            'answer.3' => 'exists:questions,id',
            'answer.4' => 'exists:questions,id',
        ];
    }
}
