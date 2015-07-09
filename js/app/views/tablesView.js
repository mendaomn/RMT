define(["jquery", "backbone", 'jsviews'],

    function($, Backbone, JSViews) {

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
                var tables = this.model;
                console.log("Drawing tables");
                var tableList = tables.getTablesList();
                $.each(tableList, function(i, table) {
                    var htmlOutput = compiledTemplate.render(table);
                    $(that.el).append(htmlOutput);
                });

            },

            show: function() {
                $(this.el).show();
            },

            hide: function() {
                $(this.el).hide();
            }

        });

        // Returns the View class
        return View;

    }

);