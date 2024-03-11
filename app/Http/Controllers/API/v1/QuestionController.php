<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Question\StoreRequest;
use App\Http\Requests\Question\UpdateRequest;
use App\Models\Question;
use App\Models\QuestionSet;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends Controller
{
    public function store(StoreRequest $request)
    {
        $validatedData = $request->validated();

        $questionSet = new QuestionSet();
        $questionSet->title = $validatedData['title'];
        $questionSet->course()
            ->associate($validatedData['course_id']);
        $questionSet
            ->save();

        foreach ($validatedData['questions'] as $key => $questionData) {
            $question = $this->makeQuestion($questionData, $questionSet);

            if ($key == $validatedData['answer']) {
                $questionSet
                    ->answer()
                    ->associate($question->id);
                $questionSet
                    ->save();
            }
        }

        $response = [
            'message' => __('questions.created'),
            'questions' => $questionSet->load('questions')->load('answer'),
        ];

        return jsonResponse($response, Response::HTTP_CREATED);
    }

    public function show(Question $question)
    {
        return jsonResponse($question, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Question $question)
    {
        $validatedData = $request->validated();

        $question->update($validatedData);
        $question->refresh();

        $response = [
            'message' => __('question.updated'),
            'question' => $question
        ];

        return jsonResponse($response, Response::HTTP_OK);

    }

    public function destroy(Question $question)
    {
        $question->delete();

        $response = [
            'message' => __('question.deleted'),
        ];

        return jsonResponse($response, Response::HTTP_NO_CONTENT);
    }

    protected function makeQuestion(array $data, QuestionSet $questionSet): Question
    {
        $question = new Question();
        $question->title = $data['title'];

        $question->questionSet()
            ->associate($questionSet);
        $question->save();

        return $question;
    }
}
