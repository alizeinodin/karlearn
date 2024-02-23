<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'question_set_id',
    ];

    public function questionSet(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(QuestionSet::class);
    }

    public function answerOf(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(QuestionSet::class);
    }
}
