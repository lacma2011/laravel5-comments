<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;


class CommentController extends BaseController
{
    // sets how deep nested replies will be retrieved for each comment in get() when comment ID is specified.
    // Since client app only expects direct replies for each comment, I'll set this to 1.
    const MAX_NESTED_REPLIES = 1;

    /**
     * 
     * @param Request $request Query string
     * @param integer $comment_id (optional) Gets comment. If used, gets chain of replies, up to MAX_NESTED_REPLIES
     * @return array
     */
    function get(Request $request, $comment_id = NULL) {
        if (NULL !== $comment_id) {
            // retrieve specific comment and its replies
            $comments = array();
            $recurse_table = function ($c_id, $nested_reply_count = 0) use (&$recurse_table) {
                $comment = Comment::where('id', '=', $c_id)->first();
                $comments['id'] = $comment['id'];
                $comments['comment'] = $comment['comment'];
                $comments['name'] = $comment['name'];

                // get replies? (if not reaching max)
                $comments['replies'] = array();
                $nested_reply_count++;
                if ($nested_reply_count <= self::MAX_NESTED_REPLIES) {
                    $replies = Comment::select('id')->where('reply_id', '=', $c_id)->get();
                    foreach ($replies as $reply) {
                        $comments['replies'][$reply['id']] = $recurse_table($reply['id'], $nested_reply_count);
                    }

                }

                // ok to reply?
                $comments['reply_ok'] = TRUE;
                if ($nested_reply_count > self::MAX_NESTED_REPLIES) {
                    $comments['reply_ok'] = FALSE;
                }

                return $comments;
            };

            $comments[$comment_id] = $recurse_table($comment_id);

        } elseif (! empty($request['article_id'] || (isset($request['article_id'])) && $request['article_id'] == '0')) {
            $comments = Comment::where('article_id','=',$request['article_id'])->where('reply_id', '=', NULL)->get();
        } else {
            $comments = Comment::all();
        }
        return $this->apiResponse(TRUE, 'Comments retrieved.', $comments);
    }

    /**
     * Post a reply to a comment
     * 
     * @param Request $request Laravel Request object
     * @param type $comment_id ID of comment to reply to
     * @return array
     */
    function postReply(Request $request, $comment_id) {
        $comment = new Comment;
        $comment->name = $request['name'];
        $comment->comment = $request['comment'];
        $comment->article_id = $request['article_id'];
        $comment->reply_id = $comment_id;
        $comment->save();

        return $this->apiResponse(TRUE, 'Reply saved.', $comment->toArray());
    }

    /**
     * Post a comment to an article
     * 
     * @param Request $request Laravel Request object
     * @param type $article_id ID of article to comment on
     * @return array
     */
    function post(Request $request, $article_id) {
        $comment = new Comment;
        $comment->name = $request['name'];
        $comment->comment = $request['comment'];
        $comment->article_id = $article_id;
        $comment->reply_id = NULL;
        $comment->save();

        return $this->apiResponse(TRUE, 'Comment saved.', $comment->toArray());
    }

    private function apiResponse($ok, $message, $data = array()) {
        $resp = new \Illuminate\Http\Response(json_encode([
            'data' => $data,
            'message'=>$message,
            'success' => $ok]));
        return $resp
                ->header('Content-Type', 'application/json');
    }
}
