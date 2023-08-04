# TEST ASSIGNMENT

## Description

The idea of this demo page of an online store catalog is to display several
products and a shopping cart in the header. The products have a name, image,
price, and an "Add to cart" button. The cost of all products in the cart is
displayed. By default, "The cart is empty (0 UAH)". When adding a product to the
cart, the number of products in it and their final price change. Products in the
basket are preserved when the page is closed and open again. If the cart is not
empty, it has a "Reset Cart" button, this removes all items and returns the cart
to an empty state.

## In Addition

Additionally I added the possibility to choose the quantity of each product, and
this quantity per product is displayed in the cart too. The chosen products are
highlighted with a different style, until the quantity is zero again.
Furthermore, I used CMS Sanity to imitate backend in this task.

## Technical Specifications

LocalStorage is used to store the cart. Styling is realized vis Bootstrap 5 and
some SCSS. The project is based on React, and it also contains such classes as
ProductsGallery, Product and Cart. The projects works in desktop Chrome/Firefox,
and is also adaptive for mobile devices.

## Technologies Used

React JavaScript Bootstrap 5 SASS/SCSS CMS Sanity is used as backend.
