// requireJS configuration
require.config({
    baseUrl: 'js/app',

    paths: {
        jquery: ["../../bower_components/jquery/dist/jquery.min"],
        papaparse: ["../../app/bower_components/papaparse/papaparse.min"],
        jsviews: ["../../app/bower_components/jsviews/jsviews.min"],
        backbone: ["../../app/bower_components/backbone/backbone-min"],
        underscore: ["../../app/bower_components/underscore/underscore-min"]
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
    }
});

require(['controllers/loader'], function(Loader) {
    var loader = new Loader();
    loader.boot();
});