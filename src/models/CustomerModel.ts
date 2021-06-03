import { Vehicle } from "./VehicleModel";

export class Customer {
    constructor(public id: string,
                public name: string,
                public email: string,
                public phoneNumber: string,
                public isAdmin: boolean,
                public isVIP: boolean,
                public rentedVehicles: Vehicle[],
                public totalVehiclesRented: number) {}
}