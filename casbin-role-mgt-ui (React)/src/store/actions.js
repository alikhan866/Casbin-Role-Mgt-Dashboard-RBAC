export const ADD_POLICY_LIST = 'ADD_POLICY_LIST';
export const ADD_ROLE_LIST = ' ADD_ROLE_LIST'
export const SET_LIST_OF_AVAILABLE_POLICIES = 'SET_LIST_OF_AVAILABLE_POLICIES'

export const addPolicyList = policyList => {
    return { type: ADD_POLICY_LIST, listOfPolicies: policyList };
};

export const addRoleList = roleList => {
    return { type:  ADD_ROLE_LIST, listOfRoles: roleList };
};

export const setListOfAvailablePolicies = (availablePolicyList) => {
    return {type : SET_LIST_OF_AVAILABLE_POLICIES, listOfAvailablePolicies:availablePolicyList}
}