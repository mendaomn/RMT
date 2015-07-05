// Model.js
// --------
define(["jquery", "backbone", 'papaparse', 'modules/item'],

    function($, Backbone, Papa, Item) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function() {
                console.log("New menu generated");
                this.itemcount = 0;
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            },

            addSection: function(name) {
                if (!this.sections)
                    this.sections = new Array();
                this.sections.push({
                    name: name
                });
            },

            addItem: function(sectionName, item) {
                var section = this.getSection(sectionName);
                if (!section.items)
                    section.items = new Array();
                item.setID(this.itemcount);
                section.items.push(item);
                this.itemcount++;
                // console.log("Added", item, "to section " + sectionName.toUpperCase());
            },

            removeItem: function(item) {

            },

            getSection: function(sectionName) {
                var section;
                $.each(this.sections, function(index, value) {
                    if (value.name == sectionName) {
                        section = value;
                        return false;
                    }
                });
                return section;
            },

            getItem: function(itemName) {
                var item;
                $.each(this.sections, function(index, value) {
                    $.each(value.items, function(index, value) {
                        if (value.getName().toUpperCase() == itemName.toUpperCase()) {
                            item = value;
                            return false;
                        }
                    });
                    if (item)
                        return false;
                });
                return $.extend(true, {}, item);
            },

            loadFromFile: function(file) {
                var that = this;
                var promise = new Promise(function(resolve, reject) {
                    Papa.parse(file, {
                        download: true,
                        complete: function(results) {
                            var currSection;
                            $.each(results.data, function(index, value) {
                                var i, len = value.length;
                                for (i = 0; i < len; i++)
                                    value[i] && value.push(value[i]);
                                value.splice(0, len);
                                if (value.length == 0) {
                                    return;
                                }
                                if (that.isSection(value)) {
                                    currSection = value[0];
                                    that.addSection(value[0]);
                                } else {
                                    var item = new Item(value[0], value[1]);
                                    that.addItem(currSection, item);
                                }
                            });
                            that.set(that.sections);
                            resolve();
                        }
                    });
                });
                return promise;
            },

            isSection: function(array) {
                return array.length == 1;
            },

            getSectionsList: function() {
                return $.map(this.sections, function(value, index) {
                    return value.name;
                });
            },

            getItemsList: function() {
                return $.map(this.sections, function(value, index) {
                    if (value.items)
                        return $.map(value.items, function(value, index) {
                            return value;
                        });
                });
            },

            getSectionItems: function(sectionName) {
                return $.grep(this.sections, function(section, i) {
                    return section.name == sectionName;
                })[0].items;
            },

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