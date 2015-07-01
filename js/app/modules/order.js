define([], 
	function(){

		Order = function(){
			this.items = new Array();
			console.log("New order generated");
		}

		Order.prototype.addItem = function(item){
			this.items.push(item);
			console.log("Added ",item);
		};

		Order.prototype.removeItem = function(item){
			this.items.remove(item);
			console.log("Removed",item);
		}

		return Order;
	}
);