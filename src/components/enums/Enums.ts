// Enums
export enum InputTypes {
    USERNAME,
    EMAIL,
    PHONE_NUMBER
}

// All the pages available in the navigation
export enum Routes {
    DEFAULT = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    HOME = "/home",
    BROWSE = "/browse",
    ALL_RENTED = "/rented/all",
    MINE_RENTED = "/rented/mine",
    REQUEST_RENTED = "/rented/request",
    RENT_A_CAR = "/rented/request/form",
    ADMIN_MANAGE_VEHICLES = "/manage/vehicles",
    ADMIN_MANAGE_USERS = "/manage/users",
    VEHICLE_DETAILS = "/vehicle/details",
}

// Vehicle Properties
export enum VehicleProperties {
    ID = "ID",
    BRAND = "Brand",
    MODEL = "Model",
    CONSTRUCTION_YEAR = "Construction Year",
    VEHICLE_TYPE = "Vehicle Type",
    FUEL_TYPE = "Fuel Type",
    SEATS = "Seats",
    IMAGE = "Image",
    AVAILABLE_VEHICLES = "Available Vehicles",
    CURRENTLY_RENTED = "Currently Rented",
    PRICE = "Price"
}
// User Properties

export enum UserProperties {
    ID = "ID",
    NAME = "Name",
    EMAIL = "Email",
    PHONE_NUMBER = "Phone Number",
    ISADMIN = "ADMIN",
    ISVIP = "VIP",
    RENTED_VEHICLES = "Current Vehicles Rented",
    TOTAL_VEHICLES_RENTED = "Total Vehicles Rented"
}

export enum RentedVehicleProperties {
    ID = "RENT ID",
    VEHICLE_ID = "Vehicle ID",
    USER_ID = "User ID",
    START_DATE = "Start Date",
    END_DATE = "End Date",
}

// ADMIN ACIONS
export enum AdminActions {
    ADD = "ADD",
    EDIT = "EDIT",
    REMOVE = "REMOVE"
}

// USER ACIONS
export enum UserActions {
    
}

// Fuel Types
export enum FuelTypes {
    PETROL = "Petrol",
    DIESEL = "Diesel",
    HYBRID = "Hybrid",
    ELECTRIC = "Electric"
}

// Vehicle Types
export enum VehicleTypes {
    ECONOMY = "Economy",
    ESTATE = "Estate",
    LUXURY = "Luxury",
    SUV = "SUV",
    CARGO = "Cargo"
}