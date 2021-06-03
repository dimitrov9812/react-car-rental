import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import { IUserstore } from '../../../store/UserStore';
import '../../../App.css';
import { Routes } from '../../enums/Enums';

const VehicleCardComponent: React.FC<any> = ({ vehicle, isActionsEnabled }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const userStore: IUserstore = store.userStore;
    const _vehicle: Vehicle = vehicle;
    const [_isActionsEnabled, setIsActionsEnabled] = useState<boolean>(isActionsEnabled);

    useEffect(() => {
        if (!_isActionsEnabled) {
            setIsActionsEnabled(true);
        } else {
            setIsActionsEnabled(false);
        }
    },[])

    const seeVehicleDetails = (): void => {
        vehicleStore.selectedVehicleDetails = _vehicle;
        history.push(Routes.VEHICLE_DETAILS);
    }

    const navigateToRentACar = (): void => {
        vehicleStore.selectedVehicleDetails = _vehicle;
        history.push(Routes.RENT_A_CAR)
    }

    const renderBookNowButton = (): JSX.Element | null => {
        if (userStore.loggedInCustomer?.isAdmin) {
            return null;
        }

        if (_vehicle.isCurrentlyRented) {
            return null
        }

        return <a className="card-link" onClick={() => navigateToRentACar()}>Book Now</a>;
    }

    const renderMainContent = (): JSX.Element | undefined => {
        if (_vehicle) {
            return (
                <div className="card" style={{width: 435, margin: 20, height: 600}}>
                    {_vehicle.isCurrentlyRented ? <div className="is-rented-badge" style={{display: 'flex', color: 'white', justifyContent: 'center', backgroundColor: 'red'}}>RENTED</div> : null}
                    <img onClick={() => seeVehicleDetails()} className="card-img-top" src={_vehicle.picture} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{_vehicle.brand}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{_vehicle.model}</li>
                            <li className="list-group-item">{_vehicle.constructionYear}</li>
                            <li className="list-group-item">{_vehicle.pricePerDay}$</li>
                        </ul>
                        {_isActionsEnabled ?
                            <div className="card-body">
                                {renderBookNowButton()}
                                <a onClick={() => seeVehicleDetails()} className="card-link">See Full Description</a>
                            </div> : null
                        }
                        
                </div>
          )
      }
  }

  return (
        <div>
            {renderMainContent()}
        </div>
  )
}

export default VehicleCardComponent;
