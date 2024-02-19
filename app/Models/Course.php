<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Pishran\LaravelPersianSlug\HasPersianSlug;
use Spatie\Sluggable\SlugOptions;

class Course extends Model
{
    use HasFactory, HasPersianSlug;

    protected $fillable = [
        'title',
        'content',
        'score',
        'index_img',
        'index_video',
        'type',
    ];
    protected $with = ['sections'];

    # TODO Add enum and casting to type

    public function getSlugOptions(): \Spatie\Sluggable\SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName(): string
    {
        return "id";
    }

    public function scopeWithAll($query)
    {
        return $query->with($this->supportedRelations);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function comments()
    {
        return $this->belongsToMany(Comment::class);
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }
}
