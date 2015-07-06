define(['jquery'],
    function($) {

        Table = function() {
        }

        Table.prototype.setID = function(id) {
            this.id = id;
        };

        return Table;
    }
);