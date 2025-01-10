<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ChapterTopics extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    protected $table = 'chapter_topics';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'chapter_id',
        'title',
        'description',
        'topic_number',
    ];

    // Define the relationship with the Chapter model
    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
