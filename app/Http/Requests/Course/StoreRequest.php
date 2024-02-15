<?php

namespace App\Http\Requests\Course;

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
            'title' => 'required|string',
            'content' => 'string',
            'cost' => 'integer',
            'type' => 'in:free,combinational,unfree',
            'index_img' => 'image|max:51200',
            'index_video' => 'mimes:mp4,avi,mkv,webm|max:204800',
            'category_id' => 'exists:categories,id',
        ];
    }
}
