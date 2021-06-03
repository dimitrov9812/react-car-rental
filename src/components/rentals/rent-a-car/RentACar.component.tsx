import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useObserver } from 'mobx-react-lite';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import VehicleCardComponent from '../../vehicle/vehicle-card/VehicleCard.component';
import { IUserstore } from '../../../store/UserStore';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Styles
import '../../../App.css';
import { Routes } from '../../enums/Enums';

const RentACarComponent: React.FC<any> = (): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const userStore: IUserstore = store.userStore;
    const _vehicle: Vehicle | undefined = vehicleStore.selectedVehicleDetails;
    
    const [finalPrice,setFinalPrice] = useState<number>(0);
    const [startDate,setStartDate] = useState<Date | null>(null);
    const [endDate,setEndDate] = useState<Date | null>(null);
    const [dayDifference, setDayDifference] = useState<number>(0);
    const [isPriceCalculated, setIsPriceCalculated] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        calculateDaysBetweenDates();
        calculatePrice();
    });

    const handleRentACarAction = (e: FormEvent): void => {
        e.preventDefault();

        if (!error && _vehicle && userStore.loggedInCustomer && startDate && endDate) {
            userStore.rentACar(_vehicle);
            vehicleStore.rentAVehicle(_vehicle, +userStore.loggedInCustomer?.id, startDate, endDate);

            history.push(Routes.MINE_RENTED);
        }
    }

    const calculatePrice = (): void => {
        let discount = 0;
        if (userStore.loggedInCustomer?.isVIP) {
            discount = 15/100;
        } else {
            if (dayDifference >= 3 && dayDifference < 5) {
                discount = 5/100
            } else if (dayDifference >= 5 && dayDifference < 10) {
                discount = 7 / 100
            } else if (dayDifference >= 10) {
                discount = 10/100
            }
        }
        if (_vehicle?.pricePerDay) {
            let priceForSelectedDays: number = _vehicle?.pricePerDay * dayDifference;
            let savings: number = priceForSelectedDays * discount;
            let finalPrice: number = priceForSelectedDays - savings;
            setFinalPrice(finalPrice);
        }
        setIsPriceCalculated(true);
    }

    const handleStartDateSelect = (e: any): void => {
        setFinalPrice(0);
        setDayDifference(0);
        let startDate: Date = new Date(e.target.value);
        let isOldDate: boolean = startDate < new Date(Date.now());
        if (endDate) {
            let isBigger: boolean = startDate > endDate;

            if (isBigger) {
                return setError('Start date cannot be bigger than end date');
            }

            if (isOldDate) {
                return setError('You selected old date as a start date');
            }

            if (!isBigger) {
                setStartDate(startDate);
            }
        }

        if (isOldDate) {
            return setError('You selected old date as a start date');
        }

        setStartDate(startDate);
    }

    const handleEndDateSelect = (e: any): void => {
        setFinalPrice(0);
        setDayDifference(0);
        let endDate: Date = new Date(e.target.value);
        let isOldDate: boolean = endDate < new Date(Date.now());

        if (startDate) {
            let isBigger: boolean = endDate < startDate;

            if (isBigger) {
                return setError('End date cannot be smaller than start date');
            }

            if (isOldDate) {
                return setError('You selected old date as a end date');
            }

            if (isBigger) {
                setEndDate(endDate);
            }
        }

        if (isOldDate) {
            return setError('You selected old date as a end date');
        }

        setEndDate(endDate);
    }

    const calculateDaysBetweenDates = (): void => {
        // To calculate the time difference of two dates
        if (startDate && endDate) {
            let timeDifference = endDate?.getTime() - startDate?.getTime();
        
            // To calculate the no. of days between two dates
            var dayDifference = timeDifference / (1000 * 3600 * 24);

            setDayDifference(dayDifference)
        }
    }

    const renderForm  = (): JSX.Element =>  {
        return (
            <div style={{width: '100%'}}>
                <form onChange={() => calculateDaysBetweenDates()}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {userStore.loggedInCustomer?.isVIP ? <div style={{alignSelf: 'center'}}><FontAwesomeIcon icon={faCrown} color='gold' />[VIP] DISCOUNT [VIP]<FontAwesomeIcon icon={faCrown} color='gold' /></div> : null}
                        <h2 style={{alignSelf: 'center'}}>Rent Vehicle Form</h2>
                        <div>
                            <p>Welcome to our rent a vehicle page. Here you can select a period of time in which you want to use the vehicle for.
                               Renting a vehicle from us has it's benefits.< br/>
                               Renting a vehicle for more than:< br/>< br/>
                               <li>3 days you get a <span>5% discount</span></li>
                               <li>5 days you get a <span>7% discount</span></li>
                               <li>10 days you get a <span>10% discount</span></li>< br/>

                               If you are one of our VIP customer you get a permanent <span>15% discount.</span>
                               <span>If you are a VIP user you can't get the additional 10% if renting a car for more than 10 days</span>
                            </p>
                        </div>
                    </div>
                    <label htmlFor="startDate" style={{color: 'black'}}>Start Date:</label>
                    <input type="date" id="startDate" name="startDate" onClick={() => setError('')} onChange={(e) => handleStartDateSelect(e)}/>
                    <label htmlFor="endDate" style={{color: 'black'}}>End Date:</label>
                    <input type="date" id="endDate" name="endDate" onClick={() => setError('')} onChange={(e) => handleEndDateSelect(e)}/>
                        {error ? <div style={{backgroundColor: 'red', color: 'white', display: 'flex', justifyContent: 'center', marginTop: 20}}>{error}</div> : null}
                        {isPriceCalculated && !error?
                            <div style={{paddingTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h3 style={{paddingRight: 40}}>Days: {dayDifference ? dayDifference : 0}</h3>
                                <h3>Final Price:</h3> <span style={{color: 'red', fontSize: '2.2rem', paddingLeft: 10}}>{finalPrice ? finalPrice : 0} $</span>
                            </div> :
                            null
                        }
                       
                    <input style={{marginTop: 20}} type="submit" value="Rent" onClick={(e) => {handleRentACarAction(e)}}/>
                </form>
                
            </div>
        )
    }

    const renderNoVehicleId  = (): JSX.Element =>  {
        return (
            <div>
                No Vehicle with the selected id
            </div>
        )
    }

    return useObserver(() => (
        <div style={{paddingTop: 20, width: '70%', margin: '0 auto', display: 'flex'}}>
            <VehicleCardComponent vehicle={_vehicle} isActionsEnabled={false}/>
            {_vehicle?.id ? renderForm() : renderNoVehicleId()}
        </div>
    ))
}

export default RentACarComponent;
