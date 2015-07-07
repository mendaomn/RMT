// hBarChart.js
// -------
define(["jquery", "backbone", 'jsviews'],

    function($, Backbone) {

        var View = Backbone.View.extend({
            el: "#menu_list",

            initialize: function() {
                console.log("View generated");
            },

            render: function() {
                console.log("Rendering sections");
                var that = this;

                $(this.el).find("li").remove();

                $.get("js/app/templates/menu_section.tmpl", function(template) {
                    compiledTemplate = $.templates(template);
                    that.drawSection(compiledTemplate);
                })


                // Maintains chainability
                return this;
            },

            drawSection: function(compiledTemplate) {
                var that = this;
                var menu = this.model;
                var sectionsList = menu.getSectionsList();
                $.each(sectionsList, function(i, sectionName) {
                    var htmlOutput = compiledTemplate.render({
                        sectionName
                    });
                    $(that.el).append(htmlOutput);
                });

            },

            toggle: function(){
                $(this.el).toggle();
            }

        });

        // Returns the View class
        return View;

    }

);