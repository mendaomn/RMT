define(["jquery", "backbone", 'jsviews'],

    function($, Backbone, JSViews) {

        var View = Backbone.View.extend({
            el: "#order_list",

            initialize: function() {
                console.log("Order view generated");
                
            },

            render: function() {
                console.log("Rendering order");
                var that = this;

                

                $(this.el).find("li").remove();

                $.get("js/app/templates/order.tmpl", function(template) {
                    compiledTemplate = $.templates(template);
                    that.drawItems(compiledTemplate);
                    $('#btn-send-order').show();
                });


                // Maintains chainability
                return this;
            },

            drawItems: function(compiledTemplate) {
                var that = this;
                console.log(this.order);
                $.each(this.order.getItems(), function(i, item) {
                    var obj = {
                        id: item.item.id,
                        name: item.item.name,
                        quantity: item.quantity
                    };
                    var htmlOutput = compiledTemplate.render(obj);
                    $(that.el).append(htmlOutput);
                });

            },

            setOrder: function(order){
                this.order = order;
            },

            show: function() {
                $(this.el).show();
                $('#btn-send-order').show();
            },

            hide: function() {
                $(this.el).hide();
                $('#btn-send-order').hide();
            }

        });

        // Returns the View class
        return View;

    }

);