<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\StoreRequest;
use App\Http\Requests\Comment\UpdateRequest;
use App\Models\Comment;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $comment = Comment::create([
            'content' => $validatedData['content'],
            'course_id' => $validatedData['course_id'],
            'user_id' => $request->user()->id,
        ]);

        $response = [
            'message' => __('comment.created'),
            'comment' => $comment,
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return jsonResponse($comment, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Comment $comment)
    {
        $validatedData = $request->validated();

        $comment->update($validatedData);

        $response = [
            'message' => __('comment.updated'),
            'comment' => $comment
        ];

        return jsonResponse($response, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        $response = [
            'message' => __('comment.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }
}
