define(["jquery", "backbone", 'jsviews'],

    function($, Backbone, JSViews) {

        var View = Backbone.View.extend({
            el: "#rooms_list",

            initialize: function() {
                console.log("Rooms view generated");
            },

            render: function() {
                console.log("Rendering rooms");
                var that = this;

                $(this.el).find("li").remove();

                $.get("js/app/templates/room.tmpl", function(template) {
                    compiledTemplate = $.templates(template);
                    that.drawRooms(compiledTemplate);
                    if (that.active_room_id) {
                        that.activeRoom(that.active_room_id);
                    }
                });

                // Maintains chainability
                return this;
            },

            drawRooms: function(compiledTemplate) {
                var that = this;
                var rooms = this.model;
                var roomsList = rooms.getRoomsList();
                $.each(roomsList, function(i, room) {
                    var htmlOutput = compiledTemplate.render(room);
                    $(that.el).append(htmlOutput);
                });

            },

            clicked: function(active_el) {
                var rooms = $(this.el).find(".activeroom").removeClass("activeroom");
                $(active_el).addClass("activeroom");
                this.active_room_id = $(active_el).attr('id');
            },

            activeRoom: function(id) {
                var rooms = $(this.el).find(".room");
                $.each(rooms, function(i, v) {
                    $(v).removeClass("activeroom");
                    if ($(v).attr('id') == id)
                        $(v).addClass("activeroom");
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