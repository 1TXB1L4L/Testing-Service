<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    protected $table = 'chapters';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'book_id',
        'title',
        'chapter_number',
        'description',
        'cover_image',
        'status',
    ];

    // Define the relationship with the Book model
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function topics()
    {
        return $this->hasMany(ChapterTopics::class);
    }
}
