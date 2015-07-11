// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone, Papa, Item) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            changeTable: function(table) {
                console.log("setting table to", table);
                this.set("table", table);
                this.trigger("change");
            },

            changeRoom: function(room) {
                console.log("setting room to", room);
                this.set("room", room);
                this.trigger("change");
            }

        });

        // Returns the Model class
        return Model;

    }

);