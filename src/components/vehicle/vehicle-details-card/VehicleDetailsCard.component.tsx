import { useContext } from 'react';
import { useHistory } from 'react-router';
import { Vehicle } from '../../../models/VehicleModel';
import { IVehicleStore } from '../../../store/VehicleStore';
import { IStore, StoreContext } from '../../../store/Store';
import '../../../App.css';
import './VehicleDetailsCard.component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const VehicleDetailsCardComponent: React.FC<any> = ({ vehicle }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const vehicleStore: IVehicleStore = store.vehicleStore;
    const _vehicle: Vehicle = vehicle;
    return (
        <div className="container">
            <div className="row">
                <h1>here</h1>
                <div className="col-md-8 col-md-offset-2 wrapper">
                    <div className="row" id="gradient">
                        <div className="col-md-4">
                            <img src={_vehicle.picture} className="img-responsive image" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="tabs_div">
                            <div>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td className="success">Brand</td>
                                            <td>{_vehicle.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Model: </td>
                                            <td>{_vehicle.model}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Construction Year: </td>
                                            <td>{_vehicle.constructionYear}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Vehicle Type: </td>
                                            <td>{_vehicle.model}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Fuel Type: </td>
                                            <td>{_vehicle.fuelType}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Is there any vehicles like this currently rented</td>
                                            <td>{_vehicle.isCurrentlyRented ? <FontAwesomeIcon icon={faCheckSquare} color='green'/> : <FontAwesomeIcon icon={faTimesCircle} color='red'/>}</td>
                                        </tr>
                                        <tr>
                                            <td className="success">Available Vehicles from that model</td>
                                            <td>{_vehicle.availableVehicles}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleDetailsCardComponent;
