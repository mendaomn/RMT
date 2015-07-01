define(['jquery', 'papaparse'],
    function($, Papa) {

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
                    if (value.getName() == itemName) {
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
            Papa.parse(file, {
                download: true,
                complete: function(results) {
                    console.log("Finished:", results.data);
                }
            });
        };

        Menu.prototype.getSectionsList = function(){
        	return $.map(this.sections, function(value, index){
        		return value.name;
        	});
        };

        Menu.prototype.getItemsList = function(){
        	return $.map(this.sections, function(value, index){
        		if (value.items)
        			return $.map(value.items, function(value, index){
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