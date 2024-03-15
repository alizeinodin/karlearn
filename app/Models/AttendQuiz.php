<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttendQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'end_time',
        'status',
        'score',
    ];

    protected $with = [
        'quiz',
        'user',
        'questionSets',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function questionSets(): BelongsToMany
    {
        return $this->belongsToMany(QuestionSet::class);
    }
}
