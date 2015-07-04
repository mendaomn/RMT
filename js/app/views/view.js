define(['jquery', 'modules/order', 'modules/item', 'modules/menu', 'jsviews'],
    function($, Order, Item, Menu, JsViews) {

        View = function() {
            this.el = "#menu_list";
            console.log("View generated");
        }

        View.prototype.populateMenu = function(menu) {
            var that = this;
            // loop through sections
            // build list containing all items in section
            // build list containing such lists
            var sectionsList = menu.getSectionsList();
            var template = "<li>{{:name}} {{:price}}</li>"
            var compiledTemplate = $.templates(template);
            
            $.each(sectionsList, function(i, sectionName){
                var sectionItems = menu.getSectionItems(sectionName);
                console.log(sectionItems);
                $.each(sectionItems, function(i, item){
                    console.log("rendering", item);
                    var htmlOutput = compiledTemplate.render(item);
                    $(that.el).append(htmlOutput);
                })
                
            });
        };

        return View;
    }
);