import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import Table from '../Table/Table'

import { useDispatch, useSelector } from 'react-redux'
import { addRoleList } from '../../store/actions'
import { hostname } from '../../constants/constants'

const addRolesRow = async (newData) => {
    console.log(newData)
    await axios({
        method: 'post',
        url: `${hostname}/role`,
        data: {
            uid: newData.v0,
            policyname: newData.v1,
        }
    })
}

const updateRolesRow = async (newData, oldData) => {
    await axios({
        method: 'put',
        url: `${hostname}/role`,
        data: {
            newRow: {
                u_rid: newData.v1 ? newData.v1 : oldData.v1,
                policyname: newData.v0 ? newData.v0 : oldData.v0,
            },
            oldRow: {
                u_rid: oldData.v1,
                policyname: oldData.v0
            }

        }
    })
}

const deleteRolesRow = async (oldData) => {
    await axios({
        method: 'delete',
        url: `${hostname}/role`,
        data: {
            v0: oldData.v0,
            v1: oldData.v1,
        }
    })
}

const Roles = () => {
    const dispatch = useCallback(useDispatch(), [])
    const roleList = useSelector(state => state.roleList)
    const availablePolicyList = useSelector(state => state.availablePolicyList)
    const listOfAvailablePolices = Object.fromEntries(availablePolicyList.entries());
    const title = "List of Available Roles"
    const columns = [
        // { title: 'ID (auto-generated)', field: 'id', editable: 'never' },
        // { title: 'PTYPE', field: 'ptype' },
        { title: 'V1 (Policy Name)', field: 'v1', lookup: listOfAvailablePolices },
        { title: 'V0 (UID)', field: 'v0' },
        { title: 'V2 (action)', field: 'v2', lookup: { read: 'read', write: 'write', update: 'update', delete: 'delete' } },
        { title: 'V3', field: 'v3' },
        { title: 'V4', field: 'v4' },
        { title: 'V5', field: 'v5' },
    ]

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${hostname}/role`)
            console.log(result.data)
            var resultObject = result.data.map((x) => {
                return {
                    v0: x[0],
                    v1: x[1]
                }
            })
            dispatch(addRoleList(resultObject))
        })()
    }, [dispatch])

    return (
        <React.Fragment>
            {roleList ?
                <Table
                    addRow={addRolesRow}
                    updateRow={updateRolesRow}
                    deleteRow={deleteRolesRow}
                    title={title}
                    columns={columns}
                    bodyData={roleList}
                /> : null}
        </React.Fragment>
    )
}

export default Roles