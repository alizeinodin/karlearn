<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'end_time',
        'status',
        'score',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function questionSet()
    {
        return $this->belongsTo(QuestionSet::class);
    }
}
