import React, { useEffect, useCallback, useState } from "react";
import Table from "../Table/Table";

import { useDispatch, useSelector } from "react-redux";
import { addPolicyList } from "../../store/actions";

import { useQuery, useMutation } from "@apollo/client";
import {
  getAllPolicies,
  addPolicyMutation,
  deletePolicyMutation,
} from "../../queries/queries";
import {
  addPolicyRowMutation,
  deletePolicyRowMutation,
  updatePolicyRowMutation,
} from "./PolicyMutations";

const Policies = () => {
  const [newPolicyRow] = useMutation(addPolicyMutation);
  const [deletePolicy] = useMutation(deletePolicyMutation);
  const [loadingData, setLoadingData] = useState(true);
  const { loading, error, data } = useQuery(getAllPolicies);

  const dispatch = useCallback(useDispatch(), []);
  let policyList = useSelector((state) => state.policyList);
  const title = "List of Available Policies";

  const addPolicyRow = (newData) => addPolicyRowMutation(newData, newPolicyRow);

  const deletePolicyRow = (oldData) =>
    deletePolicyRowMutation(oldData, deletePolicy);

  const updatePolicyRow = (newData, oldData) =>
    updatePolicyRowMutation(newData, oldData, newPolicyRow, deletePolicy);

  const columns = [
    // { title: 'ID (auto-generated)', field: 'id', editable: 'never' },
    // { title: 'PTYPE', field: 'ptype' },
    { title: "V1 (Unique Resource ID)", field: "v1" },
    { title: "V0 (Policy name)", field: "v0" },
    {
      title: "V2 (action)",
      field: "v2",
      lookup: {
        read: "read",
        write: "write",
        update: "update",
        delete: "delete",
      },
    },
    { title: "V3", field: "v3" },
    { title: "V4", field: "v4" },
    { title: "V5", field: "v5" },
  ];

  useEffect(() => {
    if (loading) {
      setLoadingData(true);
      console.log("Loading........");
    } else if (data) {
      setLoadingData(false);
      var resultObject = data.policies.map((ele) => {
        return {
          v0: ele.name,
          v1: ele.u_rid,
          v2: ele.action,
        };
      });
      console.log(resultObject);
      dispatch(addPolicyList(resultObject));
    } else if (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <React.Fragment>
      {policyList && !loadingData ? (
        <Table
          addRow={addPolicyRow}
          updateRow={updatePolicyRow}
          deleteRow={deletePolicyRow}
          title={title}
          columns={columns}
          bodyData={policyList}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Policies;
