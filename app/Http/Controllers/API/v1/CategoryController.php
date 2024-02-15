<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Requests\Category\UpdateRequest;
use App\Models\Category;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate();
        return jsonResponse($categories, Response::HTTP_OK);
    }

    public function show(Category $category)
    {
        $category->load('courses');
        return jsonResponse($category, Response::HTTP_OK);
    }

    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $category = Category::create([
            'title' => $validatedData['title']
        ]);

        $response = [
            'message' => __('category.created'),
            'category' => $category,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function update(Category $category, UpdateRequest $request)
    {
        $validatedData = $request->validated();

        $category->update($validatedData);
        $category->refresh();

        $response = [
            'message' => __('category.updated'),
            'category' => $category
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        $response = [
            'message' => __('category.deleted')
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}
