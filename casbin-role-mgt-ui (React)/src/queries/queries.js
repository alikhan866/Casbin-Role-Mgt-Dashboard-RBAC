import { gql } from '@apollo/client'

export const getAllPolicies = gql`
{
    policies {
      name
      u_rid
      action
    }
}
`

export const addPolicyMutation = gql`
mutation ($policyName:String!,$u_rid:String!,$action:String!) {
    addPolicy (v0:$policyName,v1:$u_rid,v2:$action) {
        IsMutationSuccess
    }
}
`

export const deletePolicyMutation = gql`
mutation ($policyName:String!,$u_rid:String!,$action:String) {
    deletePolicy (v0:$policyName,v1:$u_rid,v2:$action) {
        IsMutationSuccess
    }
}
`

export const getAllRoles = gql`
{
    roles{
      uid
      name
    }
}
`

export const addRoleMutation = gql`
mutation ($uid:String!,$name:String!) {
    addRole (v0:$uid,v1:$name) {
        IsMutationSuccess
    }
}
`

export const deleteRoleMutation = gql`
mutation ($uid:String!,$name:String!) {
    deleteRole (v0:$uid,v1:$name) {
        IsMutationSuccess
    }
}
`
export const Enforce = gql `
mutation ($sub:String!,$obj:String!,$act:String!) {
        enforce(sub:$sub,obj:$obj,act:$act) {
          canEnforce
        }
}
`


export const getAvailablePolicies = gql`
{
    avail_policies{
      name
    }
}
`