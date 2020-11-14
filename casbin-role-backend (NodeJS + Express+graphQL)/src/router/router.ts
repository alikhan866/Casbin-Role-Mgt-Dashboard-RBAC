import { Router } from 'express'

import { graphqlHTTP } from 'express-graphql'

import schema from '../schema/schema'

const router = Router()
router.use('/graphql',graphqlHTTP({
 schema:schema,
 graphiql:true
}))

export default router