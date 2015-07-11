define(['jquery'],
    function($) {

        Table = function() {
        }

        Table.prototype.setID = function(id) {
            this.id = id;
        };

        Table.prototype.getID = function() {
            return this.id;
        };

        return Table;
    }
);