define(['jquery', 'modules/order', 'modules/item', 'modules/menu'],
    function($, Order, Item, Menu) {

        Loader = function() {
            console.log("Loader generated");
        }

        Loader.prototype.boot = function() {
            // generate menu
            var menu = new Menu();

            menu.addSection("pizze");
            menu.addSection("panini");
            menu.addSection("secondi");

            menu.addItem("pizze", new Item("pizza", 9));
            menu.addItem("panini", new Item("house", 7));

            // generate order
            var order = new Order();

            var item1 = menu.getItem("pizza");
            var item2 = menu.getItem("house");
            order.addItem(item1);
            order.addItem(item2);

            item2.addNote("molto ghiaccio");
            item1.addIngredient("prosciutto");

            // output 
            console.log("Order is now", order);

            // cash register
            order.computeTotal();

            console.log(menu.getSectionsList());
            console.log(menu.getItemsList());
        };

        return Loader;
    }
);