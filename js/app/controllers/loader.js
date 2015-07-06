define(['jquery',
        'modules/order', 'modules/item', 'modules/menu',
        'views/sectionsView', 'views/itemsView', 'views/tablesView',
        'modules/orderManager'
    ],
    function($, Order, Item, Menu, SectionsView, ItemsView) {

        Loader = function() {
            console.log("Loader generated");
            this.views = {};
            this.menu = new Menu();
            this.menuReady = this.menu.loadFromFile("../../menu_parsable.csv");
            // this.orderManager = new OrderManager();
        }

        Loader.prototype.boot = function() {
            var that = this;
            var view = new SectionsView({
                caller: this,
                model: this.menu
            });
            this.views["sectionsView"] = view;

            this.menuReady.then(function() {
                view.render();
                console.log("Menu loaded from file");
                $("#menu_list").on("click", ".menu_section", function() {
                    var sectionName = $(this).html();
                    that.sectionClicked(sectionName);
                });
            });


        };

        Loader.prototype.sectionClicked = function(sectionName) {
            var view = new ItemsView({
                caller: this,
                model: this.menu
            });
            view.sectionName = sectionName;
            this.views["itemsView"] = view;
            view.render();
            var that = this;
            $("#menu_list").on("click", ".menu_item", function() {
                var id = $(this).attr('id');
                var item = that.menu.getItemByIDAndSection(id, sectionName);
                that.itemClicked(item);
            });
        };

        Loader.prototype.itemClicked = function(item) {
            console.log("Clicked", item);
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