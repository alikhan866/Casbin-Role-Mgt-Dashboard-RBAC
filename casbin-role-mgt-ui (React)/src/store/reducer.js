import { ADD_POLICY_LIST,ADD_ROLE_LIST } from './actions'

const initialState = {
    policyList: null,
    roleList:null
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POLICY_LIST:
            return {
                ...state,
                policyList: action.listOfPolicies
            };
        case ADD_ROLE_LIST :
            return {
                ...state,
                roleList : action.listOfRoles
            }
        default:
            return state;
    }
};

export default Reducer;