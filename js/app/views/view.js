define(['jquery', 'modules/order', 'modules/item', 'modules/menu', 'modules/view'],
    function($, Order, Item, Menu) {

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
            var template = "<li></li>"
            $.each(sectionsList, function(i, sectionName){
                var sectionItems = menu.getSectionItems(sectionName);

            });
        };

        return View;
    }
);