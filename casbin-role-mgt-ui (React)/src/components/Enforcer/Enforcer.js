import React, { useState } from 'react'
import { Select } from 'antd';
import axios from 'axios'
import classes from './Enforcer.module.css'
import { hostname } from '../../constants/constants'

const { Option } = Select;
const Enforcer = () => {

    const [uid, setUid] = useState()
    const [urid, setUrid] = useState()
    const [action, setAction] = useState("read")
    const [hasPermission, setHasPermission] = useState(null)

    const handleSelectChange = (value) => {
        // console.log(`selected ${value}`);
        setAction(value)
    }

    const EnforceRuleHandler = async () => {
        const response = await axios({
            method: "post",
            url: `${hostname}/enforce`,
            data: {
                sub: uid,
                obj: urid,
                act: action
            }
        })
        setHasPermission(response.data)
    }

    let enforcementResult

    if (hasPermission !== null) {
        if (hasPermission) {
            enforcementResult = (
                <div>TRUE</div>
            )
        } else {
            enforcementResult = (
                <div>FALSE</div>
            )
        }
    }

    return (
        <React.Fragment>
            <div className={classes.Outer}>
                <div className={classes.Inner}>
                    <input
                        type="text"
                        placeholder="UID or policy name"
                        onChange={(event) => setUid(event.target.value)}
                        style={{ height: 31, width: 240, margin: 30 }}
                    >
                    </input>
                    <input
                        type="text"
                        placeholder="Unique Resource ID"
                        onChange={(event) => setUrid(event.target.value)}
                        style={{ height: 31, width: 240, margin: 30 }}
                    ></input>
                    <Select defaultValue="read" style={{ width: 240, margin: 30 }} onChange={handleSelectChange}>
                        <Option value="read">read</Option>
                        <Option value="write">write</Option>
                        <Option value="update">update</Option>
                        <Option value="delete">delete</Option>
                    </Select>
                    <button onClick={EnforceRuleHandler}>Enforce</button>
                </div>
                <div style={{ backgroundColor: hasPermission ? 'green' : 'red', width: 150, fontWeight: 'bold', margin: 20, textAlign: 'center', borderRadius: 20, fontSize: 30 }}>
                    {enforcementResult}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Enforcer