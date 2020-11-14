"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const dbInstance_1 = __importDefault(require("../dbInstance/dbInstance"));
const IsMutationSuccessType = new graphql_1.GraphQLObjectType({
    name: "IsMutationSuccess",
    fields: () => ({
        IsMutationSuccess: { type: graphql_1.GraphQLBoolean },
    }),
});
const CanEnforceType = new graphql_1.GraphQLObjectType({
    name: "CanEnforce",
    fields: () => ({
        canEnforce: { type: graphql_1.GraphQLBoolean },
    }),
});
const AvailablePolicyType = new graphql_1.GraphQLObjectType({
    name: "AvailablePolicy",
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
    }),
});
const PolicyType = new graphql_1.GraphQLObjectType({
    name: "Policy",
    fields: () => ({
        name: { type: graphql_1.GraphQLString },
        u_rid: { type: graphql_1.GraphQLString },
        action: { type: graphql_1.GraphQLString },
    }),
});
const RoleType = new graphql_1.GraphQLObjectType({
    name: "Role",
    fields: () => ({
        uid: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        policies: {
            type: new graphql_1.GraphQLList(PolicyType),
            async resolve(_parent, _args) {
                //return something
                const res = await (await dbInstance_1.default).getPolicy();
                var formattedData = res.map(function (x) {
                    return {
                        name: x[0],
                        u_rid: x[1],
                        action: x[2],
                    };
                });
                return formattedData;
            },
        },
        avail_policies: {
            type: new graphql_1.GraphQLList(AvailablePolicyType),
            async resolve(_parent, _args) {
                // console.log(await (await dbInstance.enforcer).getPolicy())
                const res = await (await dbInstance_1.default).getPolicy();
                let set = new Set();
                res.forEach((x) => {
                    set.add(x[0]);
                });
                const result = [...set].map((ele) => {
                    return {
                        name: ele,
                    };
                });
                return result;
            },
        },
        roles: {
            type: new graphql_1.GraphQLList(RoleType),
            async resolve(_parent, _args) {
                //return role
                const res = await (await dbInstance_1.default).getGroupingPolicy();
                var formattedData = res.map(function (x) {
                    return {
                        uid: x[0],
                        name: x[1],
                    };
                });
                return formattedData;
            },
        },
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPolicy: {
            type: IsMutationSuccessType,
            args: {
                v0: { type: graphql_1.GraphQLString },
                v1: { type: graphql_1.GraphQLString },
                v2: { type: graphql_1.GraphQLString },
            },
            async resolve(_parent, args) {
                const res = await (await dbInstance_1.default).addPolicy(args.v0, args.v1, args.v2);
                console.log(res);
                return { IsMutationSuccess: res };
            },
        },
        deletePolicy: {
            type: IsMutationSuccessType,
            args: {
                v0: { type: graphql_1.GraphQLString },
                v1: { type: graphql_1.GraphQLString },
                v2: { type: graphql_1.GraphQLString },
            },
            async resolve(_parent, args) {
                const res = await (await dbInstance_1.default).removePolicy(args.v0, args.v1, args.v2);
                return { IsMutationSuccess: res };
            },
        },
        addRole: {
            type: IsMutationSuccessType,
            args: { v0: { type: graphql_1.GraphQLString }, v1: { type: graphql_1.GraphQLString } },
            async resolve(_parent, args) {
                const res = await (await dbInstance_1.default).addGroupingPolicy(args.v0, args.v1);
                return { IsMutationSuccess: res };
            },
        },
        deleteRole: {
            type: IsMutationSuccessType,
            args: { v0: { type: graphql_1.GraphQLString }, v1: { type: graphql_1.GraphQLString } },
            async resolve(_parent, args) {
                const res = await (await dbInstance_1.default).removeGroupingPolicy(args.v0, args.v1);
                return { IsMutationSuccess: res };
            },
        },
        enforce: {
            type: CanEnforceType,
            args: {
                sub: { type: graphql_1.GraphQLString },
                obj: { type: graphql_1.GraphQLString },
                act: { type: graphql_1.GraphQLString },
            },
            async resolve(_parent, args) {
                const sub = args.sub;
                const obj = args.obj;
                const act = args.act;
                const canAccess = await (await dbInstance_1.default).enforce(sub, obj, act);
                const newObj = {
                    canEnforce: canAccess,
                };
                return newObj;
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
