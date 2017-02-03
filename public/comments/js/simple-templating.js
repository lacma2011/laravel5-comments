// simple javascript templating

// AMD loading


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // this won't really do anything, because no global made currently...
        factory(jQuery);
    }
}(function () {

    // Simple JavaScript Templating by John Resig - http://ejohn.org/ - MIT Licensed
    // *slightly modified*

    var cache = {};
    var tmplStr = function (str, data){
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
          tmplStr(str) :

        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +

          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
        + "');}return p.join('');");

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    };
    return tmplStr;
}));
// Simple JavaScript Templating by John Resig - http://ejohn.org/ - MIT Licensed
// *slightly modified*
(function(){
  
})();