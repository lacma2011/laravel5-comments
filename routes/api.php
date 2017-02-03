<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Get comment(s)
// parameters:
//      id - (optional) select single comment by comment ID. Will provide replies.
// query string: filter by parameters
Route::get('comment/{id?}', 'CommentController@get');


// Post new comment(s)
// parameters:
//      article_id - Article ID
// post fields - name (required), comment (required)
Route::post('comment/{article_id}', 'CommentController@post');


// Reply to comment
// parameters:
//      comment_id - Comment ID to reply to
// post fields - name (required), comment (required)
Route::post('reply/{comment_id}', 'CommentController@postReply');
