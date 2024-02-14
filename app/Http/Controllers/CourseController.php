<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\StoreRequest;
use App\Http\Requests\Course\UpdateRequest;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::paginate();

        return jsonResponse($courses, Response::HTTP_OK);
    }

    public function show(Course $course)
    {
        return jsonResponse($course, Response::HTTP_OK);
    }

    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $course = Course::create([
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'type' => $validatedData['type'],
            'cost' => $validatedData['cost'],
            'index_img' => Storage::putFile('images', $request->file('index_img')),
            'index_video' => Storage::putFile('videos', $request->file('index_video')),
        ]);

        $response = [
            'message' => __('courses.created'),
            'course' => $course,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);

    }

    public function update(UpdateRequest $request, Course $course)
    {
        $validatedData = $request->validated();

        $course->update($validatedData);
        $course->refresh();

        $response = [
            'message' => __('course.updated'),
            'course' => $course
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        $response = [
            'message' => __('course.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}