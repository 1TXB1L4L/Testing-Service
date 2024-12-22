<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\General\ClassModel;

class Book extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    protected $table = 'books';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'class_id',
        'title',
        'author',
        'publisher',
        'cover_image',
        'pdf_file',
        'description',
        'status',
    ];

    // Define the relationship with the Class model
    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
}
