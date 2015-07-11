define(['jquery',
        'modules/order', 'modules/item', 'modules/menu', 'modules/breadcrumbModel',
        'views/sectionsView', 'views/itemsView', 'views/tablesView', 'views/roomsView', 'views/breadcrumb',
        'modules/tablesManager', 'modules/orderManager', 'modules/roomsManager'
    ],
    function($, Order, Item, Menu, BCModel,
        SectionsView, ItemsView, TablesView, RoomsView, BCView,
        TablesManager, OrderManager, RoomsManager) {

        Loader = function() {
            console.log("Loader generated");
            this.views = {};
            this.status = {};
            this.menu = new Menu();
            this.tablesManager = new TablesManager();
            this.roomsManager = new RoomsManager();
            this.menuReady = this.menu.loadFromFile("../../menu_parsable.csv");
            this.orderManager = new OrderManager();
            this.bcmodel = new BCModel();
            this.views["bcview"] = new BCView({
                model: this.bcmodel
            });

        }

        Loader.prototype.boot = function() {
            var that = this;

            this.bindClick();

            this.showTables();
        };

        Loader.prototype.bindClick = function() {
            var that = this;
            // Handle click on a menu item --> Caffe
            $("#menu_items_list").on("click", ".menu_item", function() {
                var id = $(this).attr('id');
                var item = that.menu.getItemByIDAndSection(id, that.status.sectionName);
                if (that.firstClick(this)) {
                    that.itemClicked(item);
                    that.views["itemsView"].showQuantity(this, that.getItemQuantity(item));
                } else {
                    that.itemClicked(item);
                    that.views["itemsView"].increaseQuantity();
                }

            });
            // Handle quantity decrease button
            $("#menu_items_list").on("click", "#quantity_dec", function(e) {
                    that.views["itemsView"].decreaseQuantity();
                    that.decreaseItem()
                    e.stopPropagation();
                })
                // Handle click on a menu section --> CAFFETTERIA
            $("#menu_sections_list").on("click", ".menu_section", function() {
                var sectionName = $(this).html();
                that.status.sectionName = sectionName;
                that.showItems(sectionName);
            });
            // Handle click on a table --> Table 3
            $("#tables_list").on("click", ".table", function() {
                var id = $(this).attr('id');
                var table = that.tablesManager.getTable(id);
                that.tableClicked(table);
            });
            // Handle click on a room --> Room 1
            $("#rooms_list").on("click", ".room", function() {
                var id = $(this).attr('id');
                var room = that.roomsManager.getRoom(id);
                that.views["roomsView"].clicked(this);
                that.roomClicked(room);
            });
            // compute total
            $('#btn-order').on("click", function() {
                that.runOrder();
            });
            // Handle back button
            $('#btn-back').on("click", function() {
                if (that.shown == "items")
                    that.showMenu();
                else if (that.shown == "menu") {
                    that.showTables();
                }
            });
        }

        Loader.prototype.firstClick = function(elem) {
            if (!this.status.clicked || this.status.clicked.elem != elem) {
                this.status.clicked = {
                    elem: elem
                };
                return true;
            }
            return false;

        };

        Loader.prototype.decreaseItem = function() {
            var id = $(this.status.clicked.elem).attr('id');
            var item = this.menu.getItemByIDAndSection(id, this.status.sectionName);
            var order = this.orderManager.getOrder(this.status.room, this.status.table);
            order.decreaseItem(item);
            console.log(order);
        };

        Loader.prototype.tableClicked = function(table) {
            console.log("Table selected", table);
            this.bcmodel.changeTable(table);
            this.showMenu();
        };

        Loader.prototype.showOnly = function(viewName) {
            $.each(this.views, function(key, view) {
                if (key == viewName) {
                    view.show();
                } else {
                    view.hide();
                }
            })
        };

        Loader.prototype.showTables = function() {
            var that = this;
            this.shown = "tables";

            // Create tables view

            if (!this.views["tablesView"]) {
                var view = new TablesView({
                    caller: this,
                    model: this.tablesManager
                });
                this.views["tablesView"] = view;
            } else {
                view = this.views["tablesView"];
            }

            // Create rooms view

            if (!this.views["roomsView"]) {
                this.views["roomsView"] = new RoomsView({
                    caller: this,
                    model: this.roomsManager
                });
            }

            this.showOnly("tablesView");
            view.render();
            this.views["roomsView"].show();
            this.views["roomsView"].render();

        }

        Loader.prototype.showMenu = function() {
            var that = this;
            this.shown = "menu";
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
            this.showOnly("sectionsView");
            this.menuReady.then(function() {
                view.render();

            });
        }

        Loader.prototype.showItems = function(sectionName) {
            var that = this;
            this.shown = "items";
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
            this.showOnly("itemsView");
            view.render();
        };

        Loader.prototype.itemClicked = function(item) {
            console.log("Clicked", item);
            var order = this.orderManager.getOrder(this.status.room, this.status.table);
            order.addItem(item);
            console.log(order);
            //this.showMenu();
        };

        Loader.prototype.roomClicked = function(room) {
            console.log("Room selected", room);
            this.bcmodel.changeRoom(room);
        };

        Loader.prototype.updateSelections = function() {
            $('#sel_room').append(this.status.room.getID());
            $('#sel_table').append(this.status.table.getID());
        };

        Loader.prototype.getItemQuantity = function(item) {
            var order = this.orderManager.getOrder(this.status.room, this.status.table);
            return order.getQuantity(item);
        };

        Loader.prototype.runOrder = function(menu) {
            // generate order
            var order = this.orderManager.getOrder(this.status.room, this.status.table);

            // cash register
            order.computeTotal();
        }

        return Loader;
    });