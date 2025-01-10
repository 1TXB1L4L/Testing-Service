<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['topic_id','title', 'description', 'type', 'answer', 'status'];

    /**
     * Get the options for MCQ questions.
     */
    public function options()
    {
        return $this->hasMany(MCQOption::class);
    }

    public function topic()
    {
        return $this->belongsTo(ChapterTopics::class);
    }

}
