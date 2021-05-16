import React from "react";
import axios, { AxiosResponse } from "axios";
import { useLocalObservable } from "mobx-react-lite";
// Endpoints
import { URL } from '../endpoints/endpoints';
// Models
import { Customer } from "../models/CustomerModel";
import { Vehicle } from "../models/VehicleModel";
import { RentedVehicle } from "../models/RentedVehicleModel";

export const StoreContext: React.Context<any> = React.createContext<any>(null);

export const StoreProvider: React.FC<{}> = ({ children }) => {
    const store: IStore = useLocalObservable(() => ({ 
        isLoggedIn: false,
        isLoading: false,
        loggedInCustomer: null,
        loginError: "",
        registerError: "",
        title: "Mobx Tilte",
        login: (email: string, history: any): void => {
            console.log("trying to login user with email: " + email);
            axios.get(URL.customers)
                 .then((res: AxiosResponse<Customer[]>) => {
                    let index = res.data.findIndex((customer: Customer) => customer.email === email);
                    if (index !== -1) {
                        // Set logged in
                        store.isLoggedIn = true;
                        // Get full user data and update store
                        store.setLoggedInCustomer(email, history);
                    } else {
                        store.loginError = "Invalid Email"
                    }
                 });
        },
        logout: (history: any): void => {
            // Reset user data in the store
            store.isLoggedIn = false;
            store.loggedInCustomer = null;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("email");
            // Navigate to login
            history.push('/login');
        },
        register: (username: string, email: string, phoneNumber: string, history: any): void => {
            axios.get(URL.customers)
                 .then((res: AxiosResponse<Customer[]>) => {
                    if (res.data) {
                        let index: number = res.data.findIndex((customer: Customer) => customer.email === email);
                        let id: number = res.data.length + 1;
                        // Check if the user exists
                        if (index === -1) {
                            // Create new customer
                            let customer: Customer = new Customer(id, username, email, phoneNumber, false);
                            // Update the json-server
                            axios.post(URL.customers, customer)
                                 .then((res: AxiosResponse<any>) => {
                                    // Navigate to login
                                    history.push('/login');
                                 });
                        } else {
                            store.registerError = "We already have a registered user with that email"
                        }
                    }
                 });
        },
        setLoggedInCustomer: async (email: string, history: any): Promise<void> => {
            // Search the json-sever for user with email
            axios.get(URL.customers)
                 .then((res) => {
                     let customers: Customer[] = res.data;
                    // Check if we have a valid customer
                     let index = customers.findIndex((customer: Customer) => customer.email === email);
                     if (index !== -1) {
                         // Set the logged in customer data in the store
                         store.loggedInCustomer = customers[index];
                         // Set local storage variables
                         localStorage.setItem("isAuthenticated", "1");
                         localStorage.setItem("email",store.loggedInCustomer.email);
                         // Stop loading
                         store.isLoading = false;
                     }
                 });
        }
    }));

    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    )
}

export interface IStore {
    isLoggedIn: boolean,
    isLoading: boolean,
    loggedInCustomer: Customer | null,
    loginError: string,
    registerError: string,
    title: string,
    login(email: string, history: any): void,
    logout(hostory: any): void,
    register(username: string, email: string, phoneNumber: string, history: any): void,
    setLoggedInCustomer(emai: string, history: any): Promise<void>,
}