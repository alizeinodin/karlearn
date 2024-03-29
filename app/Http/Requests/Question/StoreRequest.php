<?php

namespace App\Http\Requests\Question;

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
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:200',
            'questions' => 'required|array',
            'questions.0.title' => 'required|string',
            'questions.1.title' => 'required|string',
            'questions.2.title' => 'required|string',
            'questions.3.title' => 'required|string',
            'answer' => 'required|digits_between:0,3'
        ];
    }
}
