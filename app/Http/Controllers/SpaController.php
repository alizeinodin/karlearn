<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class SpaController extends Controller
{
    /**
     * Serve the React SPA from the CRA build output.
     */
    public function __invoke(): Response|View
    {
        $indexPath = public_path('frontend/index.html');

        if (! File::exists($indexPath)) {
            return view('spa');
        }

        return response(File::get($indexPath), 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'Cache-Control' => 'no-cache, private',
        ]);
    }
}
