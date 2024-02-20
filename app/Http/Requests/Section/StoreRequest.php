<?php

namespace App\Http\Requests\Section;

use Illuminate\Contracts\Validation\ValidationRule;
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string',
            'description' => 'string',
            'video' => 'mimes:mp4,avi,mkv,webm|max:204800',
            'resources' => 'mimes:zip|max:204800',
            'course_id' => 'required|exists:courses,id',
            'type' => 'in:free,unfree',
        ];
    }
}
