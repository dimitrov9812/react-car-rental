import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { useLocalObservable } from "mobx-react-lite";
//  URL's
import { URL } from "../endpoints/endpoints";
// Models
import { Customer } from "../models/CustomerModel";
import { Vehicle } from "../models/VehicleModel";

export const UserStore = () => {
    const userStore: IUserstore = useLocalObservable(() => ({ 
        isLoggedIn: false,
        isLoading: false,
        loggedInCustomer: null,
        loginError: "",
        registerError: "",
        title: "Mobx Tilte",
        customers: [],
        getAllUsers: () => {
            axios.get(URL.customers)
                 .then((res: AxiosResponse<Customer[]>) => {
                    let customers: Customer[] = res.data;
                    userStore.customers = customers;
                 });
        },
        login: (email: string, history: any): void => {
            axios.get(URL.customers)
                 .then((res: AxiosResponse<Customer[]>) => {
                    let index = res.data.findIndex((customer: Customer) => customer.email === email);
                    if (index !== -1) {
                        // Set logged in
                        userStore.isLoggedIn = true;
                        // Get full user data and update store
                        userStore.setLoggedInCustomer(email, history);
                    } else {
                        userStore.isLoading = false;
                        userStore.isLoggedIn = false;
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
                            let customer: Customer = new Customer(id.toString(), username, email, phoneNumber, false, false, [], 0);
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
        },
        addCustomer(customer: Customer): void {
            let index: number = userStore.customers.findIndex((c: Customer) => c.email === customer.email);
            // Check if the user exists
            if (index === -1) {
                // Update the json-server
                axios.post(URL.customers, customer)
                     .then((res: AxiosResponse<any>) => {
                         userStore.customers.push(customer);
                      });
            }
        },
        editCustomer(customer: Customer): void {
            let index = this.customers.findIndex((c: Customer) => c.id == customer.id);
            if (index == -1) {
                // Remove the customer from the server
                axios.delete(URL.customers + `/${customer.id}`)
                     .then(() => 
                        // Update the customer in the server
                        axios.post(URL.customers, customer)
                             .then((res) => {
                                 console.log('Successfully Updated Customer');
                             })
                     )
            }
        },
        removeCustomer(id: string): void {
            // Remove custoemr from customers array
            let index: number = this.customers.findIndex((c: Customer) => c.id == id);
                        
            // if we have it
            if (index != -1) {
                // we remove it
                this.customers.splice(index,1);
            }
            axios.delete(URL.customers + `/${id}`)
                 .then(() => console.log("Successfully removed customer with id: " + id))

        },
        rentACar(vehicle: Vehicle): void {
            // Check if vehicle is already in rented by the current user
            let index = userStore.loggedInCustomer?.rentedVehicles.findIndex((v: Vehicle) => v.id === vehicle.id);

            if (index == -1 && userStore.loggedInCustomer) {
                // add the vehicle as his vehicle
                userStore.loggedInCustomer?.rentedVehicles.push(vehicle);
                userStore.loggedInCustomer.totalVehiclesRented += 1;

                if (!userStore.loggedInCustomer.isVIP) {
                    if (userStore.loggedInCustomer.totalVehiclesRented > 3) {
                        userStore.loggedInCustomer.isVIP = true;
                    }
                }
                

                axios.delete(URL.customers + `/${userStore.loggedInCustomer.id}`)
                     .then(() => 
                        // Update the customer in the server
                        axios.post(URL.customers, userStore.loggedInCustomer)
                             .then((res) => {
                                 console.log(res);
                                 console.log('Successfully Updated Customer2');
                             })
                     )
            }
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
    customers: Customer[],
    getAllUsers(): void,
    login(email: string, history: any): void,
    logout(hostory: any): Promise<void>,
    register(username: string, email: string, phoneNumber: string, history: any): void,
    setLoggedInCustomer(emai: string, history: any): Promise<void>,
    addCustomer(customer: Customer): void,
    editCustomer(customer: Customer): void,
    removeCustomer(id: string): void,
    rentACar(vehicle: Vehicle): void
}