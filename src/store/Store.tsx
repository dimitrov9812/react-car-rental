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
        loggedIn: false,
        title: "Mobx Tilte",
        login: (email: string): void => {
            console.log("trying to login user with email: " + email);
            axios.get(URL.getCustomers)
                 .then((res: AxiosResponse<Customer>) =>{ 
                    console.log(res.data);
                 });
        },
        register: (username: string, email: string, phoneNumber: string): void => {
            console.log("trying to register user with username: " + username);
            console.log("trying to register user with email: " + email);
            console.log("trying to register user with phoneNumber: " + phoneNumber);
        }
    }));

    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    )
}

export interface IStore {
    loggedIn: boolean,
    title: string,
    login(email: string): void,
    register(username: string, email: string, phoneNumber: string): void
}