define(['jquery', 'modules/order', 'modules/item'], 
	function($, Order, Item){

		Loader = function(){
			console.log("Loader generated");
		}

		Loader.prototype.boot = function(){
			// generate order and add items
			var order = new Order();

			var item1 = new Item("pizza", 12);
			var item2 = new Item("birra", 5);
			item2.addNote("ghiaccio");

			order.addItem(item1);
			order.addItem(item2);

			item2.addNote("molto ghiaccio");

			item1.addIngredient("prosciutto");

			console.log("Order is now", order);

			order.computeTotal();
		};

		return Loader;
	}
);