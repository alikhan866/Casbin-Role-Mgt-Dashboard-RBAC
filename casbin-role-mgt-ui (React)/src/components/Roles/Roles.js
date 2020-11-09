import React, { useEffect, useCallback, useState, useRef } from "react";
import Table from "../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { addRoleList, setListOfAvailablePolicies } from "../../store/actions";

import { useQuery, useMutation } from "@apollo/client";
import {
  getAllRoles,
  addRoleMutation,
  deleteRoleMutation,
  getAvailablePolicies,
} from "../../queries/queries";
import {
  addRolesRowMutation,
  deleteRolesRowMutation,
  updateRolesRowMutation,
} from "./RoleMutation";

const Roles = () => {
  const title = "List of Available Roles";
  const { loading, error, data } = useQuery(getAllRoles);
  const {
    loading: policyLoading,
    error: policyError,
    data: policyData,
  } = useQuery(getAvailablePolicies);
  const [addRoleRowMutation] = useMutation(addRoleMutation);
  const [deleteRoleRowMutation] = useMutation(deleteRoleMutation);

  const columnState = useRef();
  const [isLatest, setIsLatest] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [listOfAvailablePolices, SetListOfAvailablePolices] = useState();
  const dispatch = useCallback(useDispatch(), []);
  const roleList = useSelector((state) => state.roleList);
  const availablePolicyList = useSelector((state) => state.availablePolicyList);
  const [columns, setColumnsState] = useState();

  const addRolesRow = (newData) =>
    addRolesRowMutation(newData, addRoleRowMutation);

  const deleteRolesRow = (oldData) =>
    deleteRolesRowMutation(oldData, deleteRoleRowMutation);

  const updateRolesRow = (newData, oldData) =>
    updateRolesRowMutation(
      newData,
      oldData,
      addRoleRowMutation,
      deleteRoleRowMutation
    );

  useEffect(() => {
    setIsLatest(false);
    availablePolicyList
      ? SetListOfAvailablePolices(
          Object.assign(
            {},
            availablePolicyList.map(({ name }) => name)
          )
        )
      : SetListOfAvailablePolices(false);
  }, [availablePolicyList]);

  useEffect(() => {
    listOfAvailablePolices
      ? (columnState.current = listOfAvailablePolices)
      : (columnState.current = listOfAvailablePolices);
    if (columnState.current) {
      setColumnsState([
        // { title: 'ID (auto-generated)', field: 'id', editable: 'never' },
        // { title: 'PTYPE', field: 'ptype' },
        {
          title: "V1 (Policy Name)",
          field: "v1",
          lookup: columnState.current ? columnState.current : { 0: "nodata" },
        },
        { title: "V0 (UID)", field: "v0" },
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
      ]);
    }
    setIsLatest(true);
  }, [listOfAvailablePolices]);
  console.log(columns);

  useEffect(() => {
    if (loading) {
      setLoadingData(true);
      console.log("Loading........");
    } else if (data) {
      setLoadingData(false);
      var resultObject = data.roles.map((ele) => {
        return {
          v0: ele.uid,
          v1: ele.name,
        };
      });
      dispatch(addRoleList(resultObject));
    } else if (error) {
      console.log(error);
    }
  }, [data]);

  useEffect(() => {
    if (policyLoading) {
      setLoadingData(true);
      console.log("Loading........");
    } else if (policyData) {
      var resultObject = policyData.avail_policies.map((ele) => {
        return {
          name: ele.name,
        };
      });
      console.log(resultObject);
      dispatch(setListOfAvailablePolicies(resultObject));
      setLoadingData(false);
    } else if (policyError) {
      console.log(policyError);
    }
  }, [policyData]);

  return (
    <React.Fragment>
      {roleList && columns && isLatest && !loadingData ? (
        <Table
          addRow={addRolesRow}
          updateRow={updateRolesRow}
          deleteRow={deleteRolesRow}
          title={title}
          columns={columns}
          bodyData={roleList}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Roles;
