define([], 
	function(){

		Item = function(name, price){
			this.name = name;
			this.price = price;
			console.log("New item generated", this);
		}

		Item.prototype.addNote = function(note){
			this.note = note;
			console.log("Note added", note);
		};

		return Item;
	}
);