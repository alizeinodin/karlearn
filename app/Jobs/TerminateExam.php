<?php

namespace App\Jobs;

use App\Models\AttendQuiz;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class TerminateExam implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly AttendQuiz $attendQuiz)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->attendQuiz->update([
            'end_time' => now()
        ]);
    }
}
