define(["jquery", "backbone", 'jsviews'],

    function($, Backbone, JSViews) {

        var View = Backbone.View.extend({
            el: "",

            initialize: function() {
                console.log("Breadcrumb view generated");
                this.model.on("change", this.render, this);
            },

            render: function() {
                console.log("Rendering breadcrum");
                var that = this;

                var data = {
                    room: this.model.get("room"),
                    table: this.model.get("table")
                };

                if (data.room)
                    $('#sel_room').html("Stanza: " + data.room.getID());
                if (data.table)
                    $('#sel_table').html("Tavolo: " + data.table.getID());

                // Maintains chainability
                return this;
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