define(['jquery', 'modules/order', 'modules/item', 'modules/menu', 'views/view', 'modules/orderManager'],
    function($, Order, Item, Menu, View) {

        Loader = function() {
            console.log("Loader generated");
            // this.orderManager = new OrderManager();
        }

        Loader.prototype.boot = function() {
            var that = this;
            // generate menu
            var menu = new Menu();
            var view = new View({caller: this, model: menu});
            var p = menu.loadFromFile("../../menu_parsable.csv");
            p.then(function() {
                console.log("Menu loaded from file");
                
                //view.populateMenu(menu);
                $(".menu_entry").on("click", view.onclickHandler);

                // that.runOrder(menu);               

            });
        };

        Loader.prototype.itemClicked = function(item){
            //var order = this.orderManager.getCurrentOrder();
            //order.addItem(item);
        };

        Loader.prototype.runOrder = function(menu) {
            // generate order
            var order = new Order();

            var item1 = menu.getItem("margherita");
            var item2 = menu.getItem("house");
            var item3 = menu.getItem("bIrrA1");
            order.addItem(item1);
            order.addItem(item2);
            order.addItem(item3);

            item2.addNote("molto ghiaccio");
            item1.addIngredient("prosciutto");

            // output 
            console.log("Order is now", order);

            // cash register
            order.computeTotal();

            console.log("sections", menu.getSectionsList());
            console.log("items", menu.getItemsList());
        }

        return Loader;
    }
);