import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './TableIcons/TableIcons'

const Table = (props) => {
    const { bodyData, columns, title, addRow, updateRow, deleteRow } = props
    const [state, setState] = useState({})

    useEffect(() => {
        const tranformedData = {
            columns: columns,
            data: bodyData
        }
        setState(tranformedData)
    }, [])
    
    return (
        <div className="flex-container">
            <div className="inner-element">
                <MaterialTable
                    icons={tableIcons}
                    title={title}
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowAdd: async (newData) =>
                            new Promise(async (resolve) => {
                                await addRow(newData)
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }),
                        onRowUpdate: async (newData, oldData) =>
                            new Promise(async (resolve) => {
                                await updateRow(newData, oldData)
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }),
                        onRowDelete: async (oldData) =>
                            new Promise(async (resolve) => {
                                await deleteRow(oldData)
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }),
                    }}
                />
            </div>
        </div>

    )
}

export default Table