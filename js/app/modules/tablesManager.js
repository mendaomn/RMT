// Model.js
// --------
define(["jquery", "backbone", 'papaparse', 'modules/table'],

    function($, Backbone, Papa, Table) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                this.tables = new Array();
                console.log("New table manager generated");
                for(i=0; i<10; i++){
                    this.tables[i] = new Table();
                    this.tables[i].setID(i);
                }
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            getTablesList: function(){
                return this.tables;
            },

            getTable: function(id){
                return this.tables[id];
            }

        });

        // Returns the Model class
        return Model;

    }

);


/*

- add section (primi, secondi..)
- add item to section
- remove item
- search?
- list items
- list sections

*/