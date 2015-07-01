# This document will list functional and non-functional requirements

## High-level overview

### Funcionalities

RMT should be able to 

- take order
- send order to both kitchen and cashier
- print bill or something
- manage stocks

### Usability

RMT should provide an easy to use interface, with the minimum amount of clicks per every interaction since waiters don't have time to mess with the app while taking orders.

### Users

There should exist at least 2 ways of using the app

1. waiter
	- manage orders 
2. admin
	- modify menu
	- browse statistics
	- manage stocks

## Functional requirements

### Take order

RMT should allow modifications to the order

in case of mistake/change of mind

in case of special requests (e.g. clients wants to change an ingredient)

- create new order
- list menu entries
- select entry
- store selected entry
- remove entry
- add note to entry

#### Order breakdown

1. order is made of items
2. item is a menu entry
3. item consists of name, price, [note]

### Send order

- send food order to the kitchen
- send beverages order to the bar
- order contains table id, room id
	prints in format ROOM-ID:TABLE-ID
