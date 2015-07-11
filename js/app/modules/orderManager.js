define(['jquery', 'modules/order'],
    function($, Order) {

        OrderManager = function() {
            this.orders = new Array();
            console.log("New order manager generated");
        }

        OrderManager.prototype.addOrder = function(room, table) {
            var order = new Order(room, table);
            console.log(room, table);
            this.orders.push(order);
            return order;
        };

        OrderManager.prototype.getOrder = function(room, table){
            var found;
            $.each(this.orders, function(i, order){
                if (order.getRoom() == room && order.getTable() == table){
                    found = order;
                    return false;
                }
            });
            if (!found){
                found = this.addOrder(room, table);
            }
            return found;
        }

        OrderManager.prototype.removeItem = function(item) {
            this.items.remove(item);
            console.log("Removed", item);
        }

        return OrderManager;
    }
);