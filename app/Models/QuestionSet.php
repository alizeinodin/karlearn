<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuestionSet extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
    ];

    protected $with = [
        'questions',
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function attendQuizzes(): BelongsToMany
    {
        return $this->belongsToMany(AttendQuiz::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
