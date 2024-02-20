<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'time',
        'constraint_time',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function attendQuizzes()
    {
        return $this->belongsTo(AttendQuiz::class);
    }
}
