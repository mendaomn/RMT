define(['jquery', 'papaparse', 'modules/item'],
    function($, Papa, Item) {

        Menu = function() {
            console.log("New menu generated");
        }

        Menu.prototype.addSection = function(name) {
            if (!this.sections)
                this.sections = new Array();
            this.sections.push({
                name: name
            });
        };

        Menu.prototype.addItem = function(sectionName, item) {
            var section = this.getSection(sectionName);
            if (!section.items)
                section.items = new Array();
            section.items.push(item);
            console.log("Added", item, "to section " + sectionName.toUpperCase());
        };

        Menu.prototype.removeItem = function(item) {

        };

        Menu.prototype.getSection = function(sectionName) {
            var section;
            $.each(this.sections, function(index, value) {
                if (value.name == sectionName) {
                    section = value;
                    return false;
                }
            });
            return section;
        };

        Menu.prototype.getItem = function(itemName) {
            var item;
            $.each(this.sections, function(index, value) {
                $.each(value.items, function(index, value) {
                    if (value.getName().toUpperCase() == itemName.toUpperCase()) {
                        item = value;
                        return false;
                    }
                });
                if (item)
                    return false;
            });
            return $.extend(true, {}, item);
        };

        Menu.prototype.loadFromFile = function(file) {
            var that = this;
            var promise = new Promise(function(resolve, reject) {
                Papa.parse(file, {
                    download: true,
                    complete: function(results) {
                        var currSection;
                        $.each(results.data, function(index, value) {
                            var i, len = value.length;
                            for (i = 0; i < len; i++)
                                value[i] && value.push(value[i]);
                            value.splice(0, len);
                            if (value.length == 0) {
                                return;
                            }
                            if (that.isSection(value)) {
                                currSection = value[0];
                                that.addSection(value[0]);
                            } else {
                                var item = new Item(value[0], value[1]);
                                that.addItem(currSection, item);
                            }
                        });
                        resolve();
                    }
                });
            });
            return promise;
        };

        Menu.prototype.isSection = function(array) {
            return array.length == 1;
        };

        Menu.prototype.getSectionsList = function() {
            return $.map(this.sections, function(value, index) {
                return value.name;
            });
        };

        Menu.prototype.getItemsList = function() {
            return $.map(this.sections, function(value, index) {
                if (value.items)
                    return $.map(value.items, function(value, index) {
                        return value;
                    });
            });
        };

        return Menu;
    }
);

/*

- add section (primi, secondi..)
- add item to section
- remove item
- search?
- list items
- list sections

*/