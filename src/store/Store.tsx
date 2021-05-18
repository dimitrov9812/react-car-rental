import React from "react";
import { useLocalObservable } from "mobx-react-lite";
// Stores
import { IUserstore, UserStore } from "./UserStore";
import { IVehicleStore, VehicleStore } from "./VehicleStore";


export const StoreContext: React.Context<any> = React.createContext<any>(null);

export const StoreProvider: React.FC<{}> = ({ children }) => {
    // get all the child stores
    const userStore = UserStore();
    const vehicleStore = VehicleStore();
    // create one parent store which will store them all
    const store: IStore = useLocalObservable(() => ({
        userStore: userStore,
        vehicleStore: vehicleStore
    }));

    return (
        <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
    )
}

export interface IStore {
    userStore: IUserstore,
    vehicleStore: IVehicleStore
}
