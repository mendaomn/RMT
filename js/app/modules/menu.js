define([], 
	function(){

		Menu = function(){
			console.log("New order generated");
		}

		Menu.prototype.addItem = function(item){
			this.items.append(item);
			console.log("Added ",item);
		};

		Menu.prototype.removeItem = function(item){
			this.items.remove(item);
			console.log("Removed",item);
		}

		return Menu;
	}
);