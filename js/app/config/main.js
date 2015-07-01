// requireJS configuration
require.config({
    baseUrl: 'js/app',

    paths: {
        jquery: ["../../bower_components/jquery/dist/jquery.min"]
    }
});

require(['controllers/loader'], function(Loader) {
    var loader = new Loader();
    loader.boot();
});