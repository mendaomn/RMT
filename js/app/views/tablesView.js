define(["jquery", "backbone", 'jsviews'],

    function($, Backbone) {

        var View = Backbone.View.extend({
            el: "#tables_list",

            initialize: function() {
                console.log("Tables view generated");
            },

            render: function() {
                console.log("Rendering tables");
                var that = this;

                $(this.el).find("li").remove();

                $.get("js/app/templates/table.tmpl", function(template) {
                    compiledTemplate = $.templates(template);
                    that.drawItems(compiledTemplate);
                });


                // Maintains chainability
                return this;
            },

            drawItems: function(compiledTemplate) {
                var that = this;
                var menu = this.model;
                console.log("Drawing items", this.sectionName);
                var sectionItems = menu.getSectionItems(this.sectionName);
                $.each(sectionItems, function(i, item) {
                    var htmlOutput = compiledTemplate.render(item);
                    $(that.el).append(htmlOutput);
                });

            }

        });

        // Returns the View class
        return View;

    }

);