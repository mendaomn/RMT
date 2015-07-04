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
            var template = "<li class=\"menu_entry\" id=\"item{{:entry_id}}\">{{:item.name}} {{:item.price}}</li>"
            var compiledTemplate = $.templates(template);
            var entry_id = 0;
            $.each(sectionsList, function(i, sectionName){
                var sectionItems = menu.getSectionItems(sectionName);
                console.log(sectionItems);
                $.each(sectionItems, function(i, item){
                    var htmlOutput = compiledTemplate.render({entry_id, item});
                    $(that.el).append(htmlOutput);
                    entry_id++;
                })
                
            });
        };

        View.prototype.onclickHandler = function(){
            //this.get
        };

        return View;
    }
);