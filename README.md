My Approach: Create API using ASP.NET and create front-end website in React which fetches the API data. Put the items and basket items
as properties in the React state so that these can be manipulated via event handlers.

Running It: Items are presented to the customer with their name, price and tagline shown. Each item has a checkbox, which when clicked
will display a quantity input box and 'Add to basket' button. There is also an 'Add all selected to basket' at the top of the page
for when the customer wants to select multiple items. Once items are added to the basket, the basket is displayed at the top of the
screen showing each item and a checkbox next to it. This will display a quantity box and a 'Remove item' button. There is also a
'clear basket' button and a 'Go to checkout' button, which will take the customer to the checkout page.

Future Improvements: Render and handler tests to be added via Jest. More css to be added to make page look nicer. Changes to the
page so that everything doesn't look so vertical. Login page for users. Also, could add feature for people wanting to sell to 
add a new product which would send a put request to API.

