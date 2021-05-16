export class RentedVehicle {
    constructor(public vehicleId: string,
                public customerID: string,
                public startDate: Date,
                public newDate: Date) {}
}