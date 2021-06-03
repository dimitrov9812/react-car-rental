# Car Rental 

This project was created for an university task. The task was to create car rental web service which let's user browse and rent cars. Admin portal was needed in order to be able to CRUD other Customers and Vehicles. More details can be found in the task.doc file in the repository

## How to start

Open terminal in the folder and run:

### `npm run-script start-server`

The app uses json server to mock a real server, so in order to run in you must start the mock server with the command above.

### `npm start`

This will start the project and serve it. If you haven't specified a port for the json server it should be running on port 3000 so now you must specify port for the development server different that 3000.

## App Functions

## Login / Register
As an app user you can browse the app in 2 modes - user and admin. Each mode has it's own features separated from one another. Component appearance, routes nad actions are being changed when chaning roles.

## User Role
- Browse all vehicles visualized in small cards
- Open Vehicle details page where you can see more detailed card component with vehicle details
- Request a vehicle for rent
- Requesting a vehicle can be done with a discount based on how many days you rent the vehicle for, being a VIP customer gives you 15% off
- Discounts cannot be stacked
- Fill in the rent form
- Your rented vehicles show up on a different route
- The whole list of vehicles is getting updated after someone rents a vehicle. Vehicles which are rented get a 'Rented' badge

## Admin Role
- Browse all vehicles visualized in small cards.
- Open Vehicle details page where you can see more detailed card component with vehicle details
- See a table of all the users where you can perform CRUD operations
   - You cannot edit/remove other admin users
   - When removing a user you also remove all of it's connections with vehicles - All the vehicles he rented are now marked as free for rent, rentdetails data is updated
- See a table of all vehicles where you can perform CRUD operations
   - You cannot edit/remove vehicles which are currently rented
- See a table with all the vehicle order records - there you can see some details about each of the orders and the id's of the vehicles and also customers who made the orders, also start date and end date. The table contains the id's of the user and vehicle only. In future we could update each table row to be clickable and expandable with way more details about the order.
