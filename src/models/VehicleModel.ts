export class Vehicle {
    constructor(public id: string,
                public brand: string,
                public model: string,
                public constructionYear: number,
                public vehicleType: string,
                public fuelType: string,
                public numberOfSeats: number,
                public picture: string,
                public pricePerDay: number,
                public availableVehicles: number,
                public isCurrentlyRented: boolean) {}
}