// Model.js
// --------
define(["jquery", "backbone", 'papaparse', 'modules/room'],

    function($, Backbone, Papa, Room) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                this.rooms = new Array();
                console.log("New room manager generated");
                for(i=0; i<3; i++){
                    this.rooms[i] = new Room();
                    this.rooms[i].setID(i);
                }
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            getRoomsList: function(){
                return this.rooms;
            },

            getRoom: function(id){
                return this.rooms[id];
            }

        });

        // Returns the Model class
        return Model;

    }

);