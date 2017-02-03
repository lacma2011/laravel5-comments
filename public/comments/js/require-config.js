var requireJS = (function(requireJS_AMD){



var config = {

    // Sets the js folder as the base directory for all future relative paths
    baseUrl: 'js',

    urlArgs: "pvApi=v1" + 
    // add time to  end of urlArgs during development for more immediate cache breaking:
          + "&time=" + (new Date()).getTime(),

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    paths: {
        'jquery': "vendor/jquery/jquery-3.1.1.min",
        'underscore' : 'vendor/underscore/underscore-min',
        'simple-templating' : 'simple-templating',

        // my templating loads non-compiled templates at runtime. Using it because
        // I'm not using a build tool for this demo.
        'template-loader' : 'template-loader',

        'app' : 'app'
    },

    shim: {
        'app': {
            deps: ['jquery']
        }
    },

    map: {
      // '*' means all modules will get 'jquery-noconflict'
      // for their 'jquery' dependency.
      '*': {
          'jquery': 'jquery-noconflict'
      },

      // 'jquery' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      'jquery-noconflict': { 'jquery': 'jquery' }
    }
};

return requireJS_AMD.config(config);



}(require));
