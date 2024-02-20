<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionSet extends Model
{
    use HasFactory;

    protected $with = [
        'questions',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function attendQuizzes()
    {
        return $this->hasMany(AttendQuiz::class);
    }
}
