import React, { useState } from 'react'
import { Select } from 'antd';
import classes from './Enforcer.module.css'

import { useMutation } from "@apollo/client";
import { Enforce } from '../../queries/queries'

const { Option } = Select;
const Enforcer = () => {
    
    const [EnforcementResult] = useMutation(Enforce);
    
    const [uid, setUid] = useState();
    const [urid, setUrid] = useState();
    const [action, setAction] = useState("read");
    const [hasPermission, setHasPermission] = useState(null);

    const handleSelectChange = (value) => {
        setAction(value)
    }

    const EnforceRuleHandler = async () => {
        const res = await EnforcementResult({
            variables: {
                sub: uid,
                obj: urid,
                act: action
            }
        })
        setHasPermission(res.data.enforce.canEnforce)
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