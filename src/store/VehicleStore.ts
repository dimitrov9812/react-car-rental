import { useLocalObservable } from "mobx-react-lite";


export const VehicleStore = () => {
    const vehicleStore: IVehicleStore = useLocalObservable(() => ({ 
        vehicles: [1,2,3,4,5]
    }));

    return vehicleStore;
}

export interface IVehicleStore {
    vehicles: any[],
}