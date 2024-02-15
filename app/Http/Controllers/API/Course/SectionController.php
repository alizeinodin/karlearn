<?php

namespace App\Http\Controllers\API\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Section\StoreRequest;
use App\Http\Requests\Section\UpdateRequest;
use App\Models\Course;
use App\Models\Section;
use Illuminate\Support\Facades\Storage;
use Owenoj\LaravelGetId3\GetId3;
use Symfony\Component\HttpFoundation\Response;

class SectionController extends Controller
{
    public function show(Section $section)
    {
        return jsonResponse($section, Response::HTTP_OK);
    }

    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $course = Course::find($validatedData['course_id']);


        $section = new Section();
        $section->title ??= $validatedData['title'];
        $section->description ??= $validatedData['description'];

        if (isset($validatedData['video'])) {
            $section->video ??= Storage::putFile("sections/{$course->id}/videos", $validatedData['video']);
            $section->time ??= GetId3::fromUploadedFile($validatedData['video'])->getPlaytime();
        }

        if (isset($validatedData['resources']))
            $section->resources ??= Storage::putFile("sections/{$course->id}/resources", $validatedData['resources']);

        $section
            ->course()
            ->associate($course)
            ->save();

        $response = [
            'message' => __('section.created'),
            'section' => $section
        ];

        return jsonResponse($response, Response::HTTP_CREATED);

    }

    public function update(Section $section, UpdateRequest $request)
    {
        $validatedData = $request->validated();

        $section->update($validatedData);
        $section->refresh();

        $response = [
            'message' => __('section.updated'),
            'section' => $section,
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function destroy(Section $section)
    {
        if ($section->video)
            Storage::delete($section->video);

        if ($section->resources)
            Storage::delete($section->resources);

        $section->delete();

        $response = [
            'message' => __('section.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}
