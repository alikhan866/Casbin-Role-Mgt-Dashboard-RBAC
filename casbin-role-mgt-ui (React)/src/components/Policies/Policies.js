import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import Table from '../Table/Table'

import { useDispatch, useSelector } from 'react-redux'
import { addPolicyList } from '../../store/actions'

const addPolicyRow = async (newData) => {
    console.log(newData)
    await axios({
        method: 'post',
        url: 'http://localhost:2000/policy',
        data: {
            u_rid: newData.v1,
            policyname: newData.v0,
            action: newData.v2
        }
    })
}

const updatePolicyRow = async (newData, oldData) => {
    await axios({
        method: 'put',
        url: `http://localhost:2000/policy/${oldData.id}`,
        data: {
            u_rid: newData.v1 ? newData.v1 : oldData.v1,
            policyname: newData.v0 ? newData.v0 : oldData.v0,
            action: newData.v2 ? newData.v2 : oldData.v2
        }
    })
}

const deletePolicyRow = async (oldData) => {
    await axios({
        method: 'delete',
        url: `http://localhost:2000/policy/${oldData.id}`,
    })
}




const Policies = () => {
    const dispatch = useCallback(useDispatch(), [])
    const policyList = useSelector(state => state.policyList)
    const title = "List of Available Policies"
    const columns = [
        { title: 'ID (auto-generated)', field: 'id', editable: 'never' },
        // { title: 'PTYPE', field: 'ptype' },
        { title: 'V1 (Unique Resource ID)', field: 'v1' },
        { title: 'V0 (Policy name)', field: 'v0' },
        { title: 'V2 (action)', field: 'v2' },
        { title: 'V3', field: 'v3' },
        { title: 'V4', field: 'v4' },
        { title: 'V5', field: 'v5' },
    ]

    useEffect(() => {
        (async () => {
            const result = await axios.get('http://localhost:2000/policy')
            console.log(result)
            dispatch(addPolicyList(result.data))
        })()
    }, [dispatch])

    return (
        <React.Fragment>
            {policyList ?
                <Table
                    addRow={addPolicyRow}
                    updateRow={updatePolicyRow}
                    deleteRow={deletePolicyRow}
                    title={title}
                    columns={columns}
                    bodyData={policyList}
                /> : null}
        </React.Fragment>
    )
}

export default Policies