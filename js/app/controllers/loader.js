define(['jquery',
        'modules/order', 'modules/item', 'modules/menu',
        'views/sectionsView', 'views/itemsView', 'views/tablesView',
        'modules/tablesManager', 'modules/orderManager'
    ],
    function($, Order, Item, Menu, SectionsView, ItemsView, TablesView, TablesManager, OrderManager) {

        Loader = function() {
            console.log("Loader generated");
            this.views = {};
            this.status = {};
            this.menu = new Menu();
            this.tablesManager = new TablesManager();
            this.menuReady = this.menu.loadFromFile("../../menu_parsable.csv");
            this.orderManager = new OrderManager();
        }

        Loader.prototype.boot = function() {
            var that = this;

            this.status.room = 0;
            this.showTables();
            //this.showMenu();


        };

        Loader.prototype.showTables = function() {
            var that = this;
            if (!this.views["tablesView"]) {
                var view = new TablesView({
                    caller: this,
                    model: this.tablesManager
                });
                this.views["tablesView"] = view;
            } else {
                view = this.views["tablesView"];
            }
            view.render();

            $("#tables_list").on("click", ".table", function() {
                var id = $(this).attr('id');
                var table = that.tablesManager.getTable(id);
                that.tableClicked(table);
            });
        }

        Loader.prototype.tableClicked = function(table) {
            console.log("Table selected", table);
            this.views["tablesView"].toggle();
            this.status.table = table;
            this.showMenu();
        };

        Loader.prototype.showMenu = function() {
            var that = this;
            var view;
            if (!this.views["sectionsView"]) {
                view = new SectionsView({
                    caller: this,
                    model: this.menu
                });
                this.views["sectionsView"] = view;
            } else {
                view = this.views["sectionsView"];
            }

            this.menuReady.then(function() {
                view.render();
                $("#menu_list").on("click", ".menu_section", function() {
                    var sectionName = $(this).html();
                    that.sectionClicked(sectionName);
                });
            });
        }

        Loader.prototype.sectionClicked = function(sectionName) {
            var that = this;
            var view;
            if (!this.views["itemsView"]) {
                view = new ItemsView({
                    caller: this,
                    model: this.menu
                });
                view.sectionName = sectionName;
                this.views["itemsView"] = view;
            } else {
                view = this.views["itemsView"];
                view.sectionName = sectionName;
            }

            view.render();

            $("#menu_list").on("click", ".menu_item", function() {
                var id = $(this).attr('id');
                var item = that.menu.getItemByIDAndSection(id, sectionName);
                that.itemClicked(item);
            });
        };

        Loader.prototype.itemClicked = function(item) {
            console.log("Clicked", item);
            var order = this.orderManager.getOrder(this.status.room, this.status.table);
            order.addItem(item);
            console.log(order);
            this.showMenu();
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