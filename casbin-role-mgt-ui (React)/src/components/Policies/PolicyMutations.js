import { getAvailablePolicies } from "../../queries/queries";

export const addPolicyRowMutation = (newData, newPolicyRow) => {
  console.log(newData);
  newPolicyRow({
    variables: {
      policyName: newData.v0,
      u_rid: newData.v1,
      action: newData.v2,
    },
    refetchQueries: [
      {
        query: getAvailablePolicies,
      },
    ],
  });
};

export const deletePolicyRowMutation = (oldData, deletePolicy) => {
  deletePolicy({
    variables: {
      policyName: oldData.v0,
      u_rid: oldData.v1,
      action: oldData.v2,
    },
    refetchQueries: [
      {
        query: getAvailablePolicies,
      },
    ],
  });
};

export const updatePolicyRowMutation = (
  newData,
  oldData,
  newPolicyRow,
  deletePolicy
) => {
  deletePolicy({
    variables: {
      policyName: oldData.v0,
      u_rid: oldData.v1,
      action: oldData.v2,
    },
    refetchQueries: [
      {
        query: getAvailablePolicies,
      },
    ],
  });

  newPolicyRow({
    variables: {
      policyName: newData.v0,
      u_rid: newData.v1,
      action: newData.v2,
    },
    refetchQueries: [
      {
        query: getAvailablePolicies,
      },
    ],
  });
};
