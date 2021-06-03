export class RentedVehicle {
    constructor(public id: number,
                public vehicleId: number,
                public customerID: number,
                public startDate: Date,
                public endDate: Date) {}
}