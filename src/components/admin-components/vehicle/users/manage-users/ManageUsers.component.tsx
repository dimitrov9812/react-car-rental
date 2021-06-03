import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../../../store/Store';
import SpinnerComponent from '../../../../../spinner/Spinner.component';
import { useObserver } from 'mobx-react-lite';
import TableHeadComponent from '../../../../table/table-head-component/TableHead.component';
import { IUserstore } from '../../../../../store/UserStore';
import { UserProperties } from '../../../../enums/Enums';
import { Customer } from '../../../../../models/CustomerModel';
import UserRowRecordComponent from '../../../../users/user-row-record/UserRowRecord.component';
import UserAddModalComponent from '../../../../users/user-add-modal/UserAddModal.component';
import '../../../../../App.css';

const ManageUsersComponent = (): JSX.Element => {
  const history = useHistory();
  const store: IStore = useContext(StoreContext);
  const userStore: IUserstore = store.userStore;
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const userTableColumns: string[] = [UserProperties.ID,
                                      UserProperties.NAME,
                                      UserProperties.EMAIL,
                                      UserProperties.PHONE_NUMBER,
                                      UserProperties.TOTAL_VEHICLES_RENTED,
                                      UserProperties.ISVIP,
                                      UserProperties.ISADMIN];

  useEffect(() => { 
    if (userStore.customers.length == 0) {
      userStore.getAllUsers();
    }
  }, [])

  const renderModal = (): JSX.Element | null => {
    if (isModalActive) {
      return (
          <UserAddModalComponent isActive={isModalActive} action={() => setIsModalActive(false)}/>
      )
    }

    return null;
  }

  const renderUsers = (): JSX.Element => {
    if (userStore.customers.length != 0) {
      return (
        <div style={{padding: 20,backgroundColor: 'white'}}>
          <button className="btn btn-primary" style={{marginBottom: 10}} onClick={() => setIsModalActive(!isModalActive)}>New User</button>
          <table className="table table-bordered table-striped">
            <TableHeadComponent columns={userTableColumns} />
            <tbody>
              {userStore.customers
                           .map((customer: Customer) => {
                             return (
                               <UserRowRecordComponent customer={customer} />
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
      {userStore.isLoading ? <SpinnerComponent /> : renderUsers()}
      {renderModal()}
    </div>
  ))
}

export default ManageUsersComponent;
