define(['jquery'],
    function($) {

        Order = function(room, table) {
            this.room = room;
            this.table = table;
            this.items = new Array();
            console.log("New order generated");
        };

        Order.prototype.addItem = function(item) {
            this.items.push(item);
        };

        Order.prototype.removeItem = function(item) {
            this.items.remove(item);
            console.log("Removed", item);
        };

        Order.prototype.computeTotal = function() {
            var sum = 0;
            $.each(this.items, function(index, value) {
                sum += value.getPrice();
            });
            console.log("Total", sum);
        };

        Order.prototype.getRoom = function(){
            return this.room;
        };

        Order.prototype.getTable = function(){
            return this.table;
        };

        return Order;
    }
);