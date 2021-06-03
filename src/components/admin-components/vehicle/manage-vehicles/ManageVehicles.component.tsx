import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../../store/Store';
import { IVehicleStore } from '../../../../store/VehicleStore';
import { Vehicle } from '../../../../models/VehicleModel';
import VehicleRowRecordComponent from '../../../vehicle/vehicle-row-record/VehicleRowRecord.component';
import SpinnerComponent from '../../../../spinner/Spinner.component';
import { useObserver } from 'mobx-react-lite';
import { AdminActions, VehicleProperties } from '../../../enums/Enums';
import TableHeadComponent from '../../../table/table-head-component/TableHead.component';
import VehicleAddModalComponent from '../../../vehicle/vehicle-add-modal/VehicleAddModal.component';
import '../../../../App.css';

const ManageVehiclesComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);
  const vehicleStore: IVehicleStore = store.vehicleStore;
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const vehicleTableColumns: string[] = [VehicleProperties.ID,
                                         VehicleProperties.IMAGE,
                                         VehicleProperties.BRAND,
                                         VehicleProperties.MODEL,
                                         VehicleProperties.CONSTRUCTION_YEAR,
                                         VehicleProperties.VEHICLE_TYPE,
                                         VehicleProperties.FUEL_TYPE,
                                         VehicleProperties.SEATS,
                                         VehicleProperties.AVAILABLE_VEHICLES,
                                         VehicleProperties.CURRENTLY_RENTED,
                                         VehicleProperties.PRICE,
                                         AdminActions.EDIT,
                                         AdminActions.REMOVE];

  useEffect(() => {
    if (vehicleStore.vehicles.length == 0) {
      vehicleStore.getAllVehicles();
    }
  }, [])

  const renderModal = (): JSX.Element | null => {
    if (isModalActive) {
      return (
          <VehicleAddModalComponent isActive={isModalActive} action={() => setIsModalActive(false)}/>
      )
    }

    return null;
  }

  const renderVehicles = (): JSX.Element => {
    if (vehicleStore.vehicles.length != 0) {
      return (
        <div style={{margin: 20}}>
          <button className="btn btn-primary" style={{marginBottom: 10}} onClick={() => setIsModalActive(!isModalActive)}>New Vehicle</button>
          <table className="table table-bordered table-striped">
            <TableHeadComponent columns={vehicleTableColumns} />
            <tbody>
              {vehicleStore.vehicles
                           .map((vehicle: Vehicle) => {
                             return (
                               <VehicleRowRecordComponent vehicle={vehicle} />
                             )
                           })}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div>
          <h6>Currenlty no vehicles available to manage</h6>
        </div>
      )
    }
  }

  return useObserver(() => (
    <div>
      {vehicleStore.isLoading ? <SpinnerComponent /> : renderVehicles()}
      {renderModal()}
    </div>
  ))
}

export default ManageVehiclesComponent;
