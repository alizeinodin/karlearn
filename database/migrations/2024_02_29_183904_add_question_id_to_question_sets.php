<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('question_sets', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Question::class)
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('question_sets', function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(\App\Models\Question::class);
        });
    }
};
