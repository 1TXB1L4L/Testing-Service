<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MCQOption extends Model
{
    use HasFactory;

    protected $fillable = ['question_id', 'option_text', 'is_correct'];

    /**
     * Get the question associated with the option.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
