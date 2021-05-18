import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import '../../../App.css';

const VehicleCardComponent: React.FC<any> = ({ vehicle }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: Vehicle = vehicle;

    const seeVehicleDetails = (): void => {
        vehicleStore.selectedVehicleDetails = _vehicle;
        history.push('/vehicle/details');
    }

    const renderMainContent = (): JSX.Element | undefined => {
        if (_vehicle) {
            return (
                <div className="card" style={{width: 485, margin: 20}}>
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
                        <div className="card-body">
                            <a href="#" className="card-link">Book Now</a>
                            <a onClick={() => history.push('/vehicle/details/', _vehicle)} className="card-link">See Full Description</a>
                        </div>
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
