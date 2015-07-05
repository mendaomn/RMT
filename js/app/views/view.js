// hBarChart.js
// -------
define(["jquery", "backbone", 'jsviews'],

    function($, Backbone) {

        var View = Backbone.View.extend({
            el: "#menu_list",

            initialize: function() {
                console.log("View generated");
                this.model.on("change", this.render, this);
            },

            render: function() {
                console.log("Rendering");
                var that = this;
                var menu = this.model;
                // loop through sections
                // build list containing all items in section
                // build list containing such lists
                var sectionsList = menu.getSectionsList();
                var template = "<li class=\"menu_entry\" id=\"{{:id}}\">{{:name}} {{:price}}</li>"
                var compiledTemplate = $.templates(template);
                $.each(sectionsList, function(i, sectionName) {
                    var sectionItems = menu.getSectionItems(sectionName);
                    $.each(sectionItems, function(i, item) {
                        var htmlOutput = compiledTemplate.render(item);
                        $(that.el).append(htmlOutput);
                    });

                });
                // Maintains chainability
                return this;
            },

            onclickHandler: function() {
                var id = this.id;
                var item = this.model.getItemByID(id);
                caller.itemClicked(item);
            }

        });

        // Returns the View class
        return View;

    }

);