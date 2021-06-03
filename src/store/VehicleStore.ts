import axios, { AxiosResponse } from "axios";
import { useLocalObservable } from "mobx-react-lite";
import { URL } from "../endpoints/endpoints";
import { RentedVehicle } from "../models/RentedVehicleModel";
// Models
import { Vehicle } from "../models/VehicleModel";


export const VehicleStore = () => {
    const vehicleStore: IVehicleStore = useLocalObservable(() => ({
        isLoading: false,
        vehicles: [],
        rentedVehicles: [],
        selectedVehicleDetails: undefined,
        getAllVehicles(): Promise<void> {
            vehicleStore.isLoading = true;
            return axios.get(URL.vehicles)
                        .then((res: AxiosResponse<any>) => {
                            let vehicles: Vehicle[] = res.data;    
                            vehicleStore.vehicles = vehicles;
                            this.isLoading = false;
                        });
        },
        getAllRentedVehicles(): Promise<void> {
            vehicleStore.isLoading = true;
            return axios.get(URL.rentedVehicles)
                        .then((res: AxiosResponse<any>) => {
                            let rentedVehicles: RentedVehicle[] = res.data;    
                            vehicleStore.rentedVehicles = rentedVehicles;
                            this.isLoading = false;
                            console.log("Successfully got all rented vehicles")
                        });
        },
        addVehicle(vehicle: Vehicle): void {
            axios.post(URL.vehicles, vehicle)
                 .then((res: AxiosResponse<Vehicle>) => {
                    let vehicle: Vehicle = res.data;
                    vehicleStore.vehicles.push(vehicle);
                 });
        },
        editVehicle(vehicle: Vehicle): void {
            let index = this.vehicles.findIndex((v: Vehicle) => v.id == vehicle.id);

            if (index != -1) {
                // Remove the vehicle from the server
                console.log("REMOOVING VEHICLE FROM SERVER");
                axios.delete(URL.vehicles + `/${vehicle.id}`)
                     .then(() => 
                        // Update the vehicle in the server
                        axios.post(URL.vehicles, vehicle)
                             .then(() => {
                                 console.log('Successfully Updated Vehicle');
                             })
                     );
            }
        },
        removeVehicle(id: string): void {
            // Remove vehicle from vehicles array
            let index: number = this.vehicles.findIndex((v: Vehicle) => v.id == id);
            
            // if we have it
            if (index != -1) {
                // we remove it
                this.vehicles.splice(index,1);
            }
            axios.delete(URL.vehicles + `/${id}`)
                 .then(() => console.log("Successfully removed vehicle with id: " + id));
        },
        rentAVehicle(vehicle: Vehicle, userId: number, startDate: Date, endDate: Date): void {
            vehicle.isCurrentlyRented = true;

            vehicleStore.editVehicle(vehicle);

            let index: number = vehicleStore.rentedVehicles.findIndex((v: RentedVehicle) => v.vehicleId == +vehicle.id);
            console.log('renting a vehicle')

            if (index == -1) {
                console.log('1')
                // get the maximum item id
                let maxID: number = 0;

                vehicleStore.rentedVehicles.map((vehicle: RentedVehicle) => {
                    console.log('maxID - 1 : ' + maxID)
                    if (+vehicle.id > maxID) {
                        maxID = vehicle.id;
                        console.log('maxId: ' + maxID);
                    }
                });

                let rentedVehicle: RentedVehicle = new RentedVehicle(+maxID + 1, +vehicle.id, userId, startDate, endDate);
                vehicleStore.rentedVehicles.push(rentedVehicle);

                axios.post(URL.rentedVehicles, rentedVehicle)
                     .then((res) => {
                         console.log('Successfully Updated rented vehicles URL');
                     })
            }
        }
    }));

    return vehicleStore;
}

export interface IVehicleStore {
    isLoading: boolean,
    vehicles: Vehicle[],
    rentedVehicles: RentedVehicle[],
    selectedVehicleDetails: Vehicle | undefined,
    getAllVehicles(): Promise<void>,
    getAllRentedVehicles(): Promise<void>,
    addVehicle(vehicle: Vehicle): void,
    editVehicle(vehicle: Vehicle): void,
    removeVehicle(id: string): void,
    rentAVehicle(vehicle: Vehicle, userId: number, startDate: Date, endDate: Date): void,
}