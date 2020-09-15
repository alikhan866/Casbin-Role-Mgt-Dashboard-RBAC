const express = require('express')
const router = express.Router()
const { enforcer } = require('../enforcer/enforcer')
var cors = require('cors')

router.use(cors())

router.get('/policy', async (req, res, next) => {       //get policies

    try {
        let results = await (await enforcer).getPolicy()
        res.json(results)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
})

router.post('/policy', async (req, res, next) => {          //add policy
    try {
        console.log(req.body);
        const id = req.body.u_rid;
        const roleName = req.body.policyname;
        const action = req.body.action;
        (await enforcer).addPolicy(roleName, id, action);
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.put('/policy', async (req, res, next) => {       //update policy
    try {
        const new_v0 = req.body.newRow.policyname
        const new_v1 = req.body.newRow.u_rid
        const new_v2 = req.body.newRow.action

        const old_v0 = req.body.oldRow.policyname
        const old_v1 = req.body.oldRow.u_rid
        const old_v2 = req.body.oldRow.action

        await (await enforcer).removePolicy(old_v0,old_v1,old_v2)
        await (await enforcer).addPolicy(new_v0,new_v1,new_v2)
        res.sendStatus(200)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});

router.delete('/policy', async (req, res, next) => {    //delete policy
    try {
        await (await enforcer).removePolicy(req.body.v0,req.body.v1,req.body.v2)
        res.sendStatus(200)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});


router.get('/role', async (req, res, next) => {         //get roles
    try {
        let results = await (await enforcer).getGroupingPolicy()
        res.json(results)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});

router.post('/role', async (req, res, next) => {        //add roles
    try {
        console.log(req.body);
        const uid = req.body.uid;
        const policyName = req.body.policyname;
        (await enforcer).addGroupingPolicy(uid, policyName);
        res.sendStatus(200)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/role', async (req, res, next) => {    //delete policy
    try {
        await (await enforcer).removeGroupingPolicy(req.body.v0,req.body.v1)
        res.sendStatus(200)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});

router.put('/role', async (req, res, next) => {       //update role
    try {
        const new_v0 = req.body.newRow.policyname
        const new_v1 = req.body.newRow.u_rid

        const old_v0 = req.body.oldRow.policyname
        const old_v1 = req.body.oldRow.u_rid

        await (await enforcer).removeGroupingPolicy(old_v0,old_v1)
        await (await enforcer).addGroupingPolicy(new_v0,new_v1)
        res.sendStatus(200)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});

router.post('/enforce' , async (req,res,next) => {
    try {
        const sub = req.body.sub 
        const obj = req.body.obj
        const act = req.body.act
        const canAccess = await (await enforcer).enforce(sub,obj,act)
        res.send(canAccess)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
})


module.exports = router