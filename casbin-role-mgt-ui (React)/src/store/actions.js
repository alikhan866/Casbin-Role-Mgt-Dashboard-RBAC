export const ADD_POLICY_LIST = 'ADD_POLICY_LIST';
export const ADD_ROLE_LIST = ' ADD_ROLE_LIST'

export const addPolicyList = policyList => {
    return { type: ADD_POLICY_LIST, listOfPolicies: policyList };
};

export const addRoleList = roleList => {
    return { type:  ADD_ROLE_LIST, listOfRoles: roleList };
};

// export const numberOfCharacters = number => {
//     return {
//         type:NUMBER_OF_CHARACTERS,
//         numberOfCharacters:number
//     }
// }