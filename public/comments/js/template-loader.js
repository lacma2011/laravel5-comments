// runs a callback after templates are loaded, with loaded templates.

// AMD loaded
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'underscore', 'simple-templating'], factory);
    } else {
        // this won't really do anything, because no global exported
        factory(jQuery);
    }
}(function ($, _, templating) {
    /**
    *   @param locations object Associate array. Key is name for the template. Value is path to the template
    *   @param callbackFn function callback to run after done loading templates. Parameter is results indexed by key in locations
    */
    return function(locations, callbackFn) {
        var templateRequests = [];
        $.each(locations, function(key, value) {
            templateRequests.push($.get(value + '?' + $.now()));
        });

        $.when.apply(this, templateRequests).then(function(){
            var response = arguments;
            var templates = {};
            if (_.size(locations) === 1) {
                // if only one request, only one array in response
                templates[Object.keys(locations)[0]] = response[0];
            } else {
                // for multiple requests, response has multiple arrays
                var x = 0;
                $.each(locations, function(key) {
                    // match order of results to locations order
                    templates[key] = response[x][0];
                    x++;
                });
            }
            callbackFn(templates);
        });
    };
}));
