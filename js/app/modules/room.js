define(['jquery'],
    function($) {

        Room = function() {
        }

        Room.prototype.setID = function(id) {
            this.id = id;
        };

        Room.prototype.getID = function() {
            return this.id;
        };

        return Room;
    }
);