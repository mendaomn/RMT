define(['jquery'],
    function($) {

        Order = function(room, table) {
            this.room = room;
            this.table = table;
            this.items = new Array();
            console.log("New order generated");
        };

        Order.prototype.addItem = function(item) {
            var found;
            $.each(this.items, function(i, val) {
                if (val.item.getName() == item.getName()) {
                    found = val;
                    return false;
                }
            });
            if (found) {
                found.quantity++;
            } else {
                this.items.push({
                    item: item,
                    quantity: 1
                });
            }
        };

        Order.prototype.decreaseItem = function(item) {
            var that = this;
            $.each(this.items, function(i, val) {
                if (val.item.getName() == item.getName()) {
                    if (val.quantity == 1)
                        that.items.splice(i, 1);
                    else
                        val.quantity--;
                    return false;
                }
            });
        };

        Order.prototype.removeItem = function(item) {
            var that = this;
            $.each(this.items, function(i, val) {
                if (val.item.getName() == item.getName()) {
                    that.items.splice(i, 1);
                    return false;
                }
            });
            console.log("Removed", item);
        };

        Order.prototype.computeTotal = function() {
            var sum = 0;
            $.each(this.items, function(index, value) {
                sum += value.item.getPrice() * value.quantity;
            });
            console.log("Total", sum);
            return sum;
        };

        Order.prototype.getRoom = function() {
            return this.room;
        };

        Order.prototype.getTable = function() {
            return this.table;
        };

        Order.prototype.getItems = function(){
            return this.items;
        };

        Order.prototype.getQuantity = function(item) {
            var qty;
            $.each(this.items, function(i, val) {
                if (val.item.getName() == item.getName()) {
                    qty = val.quantity;
                    return false;
                }
            });
            if (qty) return qty;
            else return 1;
        };

        return Order;
    }
);