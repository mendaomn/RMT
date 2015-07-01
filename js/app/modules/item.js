define([],
    function() {

        Item = function(name, price) {
            this.name = name;
            this.price = price;
            console.log("New item generated", this);
        }

        Item.prototype.addNote = function(note) {
            this.note = note;
            console.log("Note added", note);
        };

        Item.prototype.addIngredient = function(ingredient) {
            if (!this.additions)
                this.additions = new Array();
            this.additions.push(ingredient);
            console.log("Ingredient added", ingredient);
        };

        Item.prototype.getPrice = function() {
            var additionalCost = 0;
            if (this.additions)
                additionalCost = this.additions.length * 1;
            return this.price + additionalCost;
        };

        Item.prototype.getName = function() {
            return this.name;
        };

        return Item;
    }
);