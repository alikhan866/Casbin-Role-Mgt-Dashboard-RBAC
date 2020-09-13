const express = require('express')
const db = require('../database/database')
const router = express.Router()
const { enforcer } = require('../enforcer/enforcer')
var cors = require('cors')

router.use(cors())

router.get('/policy', async (req, res, next) => {       //get policies

    try {
        let results = await db.getPolicy()
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
        res.json(res.sendStatus(200));
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/role', async (req, res, next) => {         //get roles
    try {
        let results = await db.getRole()
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
        res.json(res.sendStatus(200));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


router.put(['/policy/:id','/role/:id'], async (req, res, next) => {       //update policy
    try {
        const v0 = req.body.policyname
        const v1 = req.body.u_rid
        const v2 = req.body.action
        let results = await db.update(req.params.id,v0,v1,v2)
        res.json(results)
    } catch (e) {
        console.log(500)
        res.sendStatus(500)
    }
});

router.delete(['/policy/:id','/role/:id'], async (req, res, next) => {    //delete policy
    try {
        let results = await db.delete(req.params.id)
        res.json(results)
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