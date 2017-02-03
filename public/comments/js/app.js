
// AMD definition

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'simple-templating', 'template-loader'], factory);
    } else {
        // this won't really do anything, because no global made currently...
        factory(jQuery);
    }
}(function ($, templating, templateLoader) {

return function (url, articleId) {
    // API endpoint
    var api = url + '/api/';

    // First load templates here with my own loader (until a templating engine is used)
    // My templating loads non-compiled templates at runtime. Using it because
    // I'm not making builds for this developer demo.
    var templateSources = {
            'comment-item' : 'templates/comment.tpl',
            'comment-create' : 'templates/comment-create.tpl'
        };
    templateLoader(templateSources, function(templates) {
        // templates is an object with the templates indexed by keys in templateSources
        //  ex. var html = templating(templates['comment-item'], this.model.toJSON());

        $('#results').empty().append('loading...');
        // get article comments
        $.get(api + 'comment?article_id=' + articleId).then(function(data){
            $('#results').empty();
            var list = $('<ul class="comments"></ul>');
            $.each(data.data, function(k, obj) {
                var comment = '<li>' + templating(templates['comment-item'], obj) + '</li>';
                var ele = $(comment);
                ele
                        .find('.reply')
                        .on('click', replyFn(ele, obj.id))
                        .end()
                        .find('.replies')
                        .on('click', repliesFn(ele, obj.id));
                list.append(ele);
            });
            $('#results').append(list);
        });

        function repliesFn(ele, commentId) {
            return function (e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                ele
                    .find('.replies')
                    .off('click');
                // get replies
                $.get(api + 'comment/' + commentId).then(function(data){
console.log(data.data);
                    var list = $('<ul class="replies"></ul>');
                    $.each(data.data[commentId].replies, function(k, obj) {
                        var comment = '<li>' + templating(templates['comment-item'], obj) + '</li>';
                        var newEle = $(comment);

                        newEle
                                .find('.reply')
                                .on('click', replyFn(newEle, obj.id))
                                .end()
                                .find('.replies')
                                .on('click',  repliesFn(newEle, obj.id));
                        list.append(newEle);
                    });
                    ele
                        .find('.replies')
                        .empty()
                        .append(list);

                });
            };
        }

        function replyFn(ele, commentId) {
            return function (e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                ele.find('.reply').off('click');
console.log('reply to ' + commentId);
                var form = $(templating(templates['comment-create'], {}));
                form
                        .find('button')
                        .first()
                        .on('click', function(e){
                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            $.ajax({
                                url: api + 'reply/' + commentId,
                                type: 'post',
                                data: {
                                    name: form.find('.comment-name').val(),
                                    comment: form.find('.comment-comment').val(),
                                    reply_id: commentId,
                                    article_id: articleId
                                }
                            }).then(function(){
                                // refresh replies for this ele
                                ele.find('.replies').empty();
                                var fn = repliesFn(ele, commentId);
                                fn({stopImmediatePropagation: $.noop, stopPropagation: $.noop});
                            });
                        });
                ele
                        .find('.reply')
                        .first()
                        .empty()
                        .append(form);
            };
        }
    });

    
};

}));
