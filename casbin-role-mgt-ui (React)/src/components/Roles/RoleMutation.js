export const addRolesRowMutation = (newData, addRoleRowMutation) => {
  console.log(newData);
  addRoleRowMutation({
    variables: {
      uid: newData.v0,
      name: newData.v1,
    },
  });
};

export const deleteRolesRowMutation = (oldData, deleteRoleRowMutation) => {
  deleteRoleRowMutation({
    variables: {
      uid: oldData.v0,
      name: oldData.v1,
    },
  });
};

export const updateRolesRowMutation = (
  newData,
  oldData,
  addRoleRowMutation,
  deleteRoleRowMutation
) => {
  deleteRoleRowMutation({
    variables: {
      uid: oldData.v0,
      name: oldData.v1,
    },
  });

  addRoleRowMutation({
    variables: {
      uid: newData.v0,
      name: newData.v1,
    },
  });
};
