import axios, { AxiosResponse } from "axios";
import { useLocalObservable } from "mobx-react-lite";
import { URL } from "../endpoints/endpoints";
// Models
import { Vehicle } from "../models/VehicleModel";


export const VehicleStore = () => {
    const vehicleStore: IVehicleStore = useLocalObservable(() => ({ 
        vehicles: [],
        selectedVehicleDetails: undefined,
        getAllVehicles(): Promise<void> {
            return axios.get(URL.vehicles)
                 .then((res: AxiosResponse<any>) => {
                     let vehicles: Vehicle[] = res.data;
                     vehicleStore.vehicles = vehicles;
                 });
        }
    }));

    return vehicleStore;
}

export interface IVehicleStore {
    vehicles: Vehicle[],
    selectedVehicleDetails: Vehicle | undefined;
    getAllVehicles(): Promise<void>
}