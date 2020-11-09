const express = require('express')
const router = express.Router()
const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')
router.use('/graphql',graphqlHTTP({
 schema:schema,
 graphiql:true
}))

module.exports = router