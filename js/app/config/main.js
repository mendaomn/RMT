// requireJS configuration
require.config({
    baseUrl: 'js/app',

    paths: {
        jquery: ["../../bower_components/jquery/dist/jquery.min"],
        papaparse: ["../../app/bower_components/papaparse/papaparse.min"]
    }
});

require(['controllers/loader'], function(Loader) {
    var loader = new Loader();
    loader.boot();
});