

import { useContext } from 'react';
import { useHistory } from 'react-router';
import { IStore, StoreContext } from '../../../store/Store';
import '../../../App.css';
import { useObserver } from 'mobx-react-lite';

const TableHeadComponent: React.FC<any> = ({ columns }): JSX.Element => {
    const history = useHistory();
    const store: IStore = useContext(StoreContext);
    const _columns: string[] = columns;

    const renderTableHead = (): JSX.Element => {
        if (_columns.length != 0) {
            return (
                <tr>
                    {_columns.map((column: string) => {
                        return <th className="">{column}</th>
                    })}
                </tr>
            )
        } else {
            return (
                <div>
                    <h6>No columns provided for that table</h6>
                </div>
            )
        }
    }

    return useObserver(() => (
        <thead>
                {renderTableHead()}
        </thead>
        
    ))
}

export default TableHeadComponent;
