// requireJS configuration
require.config({
    baseUrl: 'js/app',

    paths: {
        jquery: ["../../bower_components/jquery/dist/jquery.min"],
        papaparse: ["../../app/bower_components/papaparse/papaparse.min"],
    	jsviews: ["../../app/bower_components/jsviews/jsviews.min"]
    }
});

require(['controllers/loader'], function(Loader) {
    var loader = new Loader();
    loader.boot();
});