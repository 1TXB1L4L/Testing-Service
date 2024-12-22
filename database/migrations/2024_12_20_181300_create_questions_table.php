<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained('chapter_topics')->cascadeOnDelete();
            $table->string('title'); // Question text
            $table->text('description')->nullable(); // Detailed explanation
            $table->enum('type', ['mcq', 'short', 'long']); // Type of question
            $table->text('answer')->nullable(); // Answer for short/long
            $table->boolean('status')->default(true); // Active/inactive
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
