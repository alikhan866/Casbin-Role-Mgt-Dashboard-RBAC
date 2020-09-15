import { ADD_POLICY_LIST, ADD_ROLE_LIST, SET_LIST_OF_AVAILABLE_POLICIES } from './actions'

const initialState = {
    policyList: null,
    roleList: null,
    availablePolicyList: null
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POLICY_LIST:
            return {
                ...state,
                policyList: action.listOfPolicies
            };
        case ADD_ROLE_LIST:
            return {
                ...state,
                roleList: action.listOfRoles
            }
        case SET_LIST_OF_AVAILABLE_POLICIES:
            return {
                ...state,
                availablePolicyList: action.listOfAvailablePolicies
            }
        default:
            return state;
    }
};

export default Reducer;