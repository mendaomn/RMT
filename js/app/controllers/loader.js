define(['jquery', 'modules/order', 'modules/item', 'modules/menu', 'views/view'],
    function($, Order, Item, Menu) {

        Loader = function() {
            console.log("Loader generated");
        }

        Loader.prototype.boot = function() {
            var that = this;
            // generate menu
            var menu = new Menu();
            var view;

            var p = menu.loadFromFile("../../menu_parsable.csv");
            p.then(function(){
                console.log("Menu loaded from file");
                console.log(menu);

                view = new View();
                view.populateMenu(menu);
                $(".menu_entry").on("click", view.onclickHandler);

                that.runOrder(menu);               
    
            });
        };

        Loader.prototype.runOrder = function(menu){
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