<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;


class ClassModel extends Model
{
    use HasFactory;
    // Specify the table name if it's not the plural form of the model name
    protected $table = 'classes';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'name',
        'description',
        'status',
        'user_id',
        'slug',
        'image',
    ];



    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }

}
