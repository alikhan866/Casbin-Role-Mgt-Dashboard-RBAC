const graphql = require('graphql')
const dbInstance = require('../dbInstance/dbInstance')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
} = graphql


const IsMutationSuccessType = new GraphQLObjectType({
    name: 'IsMutationSuccess',
    fields: () => ({
        IsMutationSuccess: { type: GraphQLBoolean }
    })
})

const CanEnforceType = new GraphQLObjectType({
    name: 'CanEnforce',
    fields: () => ({
        canEnforce: { type: GraphQLBoolean }
    })
})

const AvailablePolicyType = new GraphQLObjectType({
    name: 'AvailablePolicy',
    fields: () => ({
        name: { type: GraphQLString },
    })
})

const PolicyType = new GraphQLObjectType({
    name: 'Policy',
    fields: () => ({
        name: { type: GraphQLString },
        u_rid: { type: GraphQLString },
        action: { type: GraphQLString }
    })
})

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        policies: {
            type: new GraphQLList(PolicyType),
            async resolve(parent, args) {
                //return something
                const res = await (await dbInstance.enforcer).getPolicy()
                var formattedData = res.map(function (x) {
                    return {
                        name: x[0],
                        u_rid: x[1],
                        action: x[2]
                    };
                });
                return formattedData
            }
        },
        avail_policies: {
            type: new GraphQLList(AvailablePolicyType),
            async resolve(parent, args) {
                // console.log(await (await dbInstance.enforcer).getPolicy())
                const res = await (await dbInstance.enforcer).getPolicy()
                let set = new Set()
                res.forEach((x) => {
                    set.add(x[0])
                })
                const result = [...set].map((ele) => {
                    return {
                        name: ele
                    }
                })
                return result
            }
        },
        roles: {
            type: new GraphQLList(RoleType),
            async resolve(parent, args) {
                //return role
                const res = await (await dbInstance.enforcer).getGroupingPolicy()
                var formattedData = res.map(function (x) {
                    return {
                        uid: x[0],
                        name: x[1]
                    };
                });
                return formattedData
            }
        },
        enforce: {
            type: CanEnforceType,
            args: { sub: { type: GraphQLString }, obj: { type: GraphQLString }, act: { type: GraphQLString } },
            async resolve(parent, args) {
                const sub = args.sub
                const obj = args.obj
                const act = args.act

                const canAccess = await (await dbInstance.enforcer).enforce(sub, obj, act)
                const newObj = {
                    canEnforce: canAccess
                }
                return newObj
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPolicy: {
            type: IsMutationSuccessType,
            args: { v0: { type: GraphQLString }, v1: { type: GraphQLString }, v2: { type: GraphQLString } },
            async resolve(parent, args) {
                const res = await (await dbInstance.enforcer).addPolicy(args.v0, args.v1, args.v2)
                console.log(res)
                return { IsMutationSuccess: res }
            }
        },
        deletePolicy: {
            type: IsMutationSuccessType,
            args: { v0: { type: GraphQLString }, v1: { type: GraphQLString }, v2: { type: GraphQLString } },
            async resolve(parent, args) {
                const res = await (await dbInstance.enforcer).removePolicy(args.v0, args.v1, args.v2)
                return { IsMutationSuccess: res }
            }
        },
        addRole: {
            type: IsMutationSuccessType,
            args: { v0: { type: GraphQLString }, v1: { type: GraphQLString } },
            async resolve(parent, args) {
                const res = await (await dbInstance.enforcer).addGroupingPolicy(args.v0, args.v1)
                return { IsMutationSuccess: res }
            }
        },
        deleteRole: {
            type: IsMutationSuccessType,
            args: { v0: { type: GraphQLString }, v1: { type: GraphQLString } },
            async resolve(parent, args) {
                const res = await (await dbInstance.enforcer).removeGroupingPolicy(args.v0, args.v1)
                return { IsMutationSuccess: res }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})