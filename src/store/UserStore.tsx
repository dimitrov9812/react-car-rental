import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { useLocalObservable } from "mobx-react-lite";
//  URL's
import { URL } from "../endpoints/endpoints";
// Models
import { Customer } from "../models/CustomerModel";

export const UserStore = () => {
    const userStore: IUserstore = useLocalObservable(() => ({ 
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
                        userStore.isLoggedIn = true;
                        // Get full user data and update store
                        userStore.setLoggedInCustomer(email, history);
                    } else {
                        userStore.loginError = "Invalid Email"
                    }
                 });
        },
        logout: async (history: any): Promise<void> => {
            // Set local storage data
            console.log('logging out')
            await AsyncStorage.setItem("isAuthenticated", "0");
            await AsyncStorage.setItem("email", "null");

            // Reset user data in the store
            userStore.isLoading = true;
            userStore.isLoggedIn = false;
            userStore.loggedInCustomer = null;
            userStore.isLoading = false;
            
            // navigate user to login screen
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
                            userStore.registerError = "We already have a registered user with that email"
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
                         userStore.loggedInCustomer = customers[index];
                         // Set local storage variables
                         AsyncStorage.setItem("isAuthenticated", "1")
                                     .then(() => {
                                        AsyncStorage.setItem("email",userStore.loggedInCustomer?.email ? userStore.loggedInCustomer?.email : 'null')
                                                    .then(() => {
                                                        // Stop loading
                                                        userStore.isLoading = false;
                                                    });
                                     });
                     }
                 });
        }
    }));

    return userStore;
}

export interface IUserstore {
    isLoggedIn: boolean,
    isLoading: boolean,
    loggedInCustomer: Customer | null,
    loginError: string,
    registerError: string,
    title: string,
    login(email: string, history: any): void,
    logout(hostory: any): Promise<void>,
    register(username: string, email: string, phoneNumber: string, history: any): void,
    setLoggedInCustomer(emai: string, history: any): Promise<void>,
}