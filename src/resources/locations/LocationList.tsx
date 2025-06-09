import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
  Create,
  SimpleForm,
  Edit,
} from "react-admin";

export const LocationList = () => (
  <List pagination={false}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="label" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const LocationCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="label" />
    </SimpleForm>
  </Create>
);

export const LocationEdit = () => (
  <Edit redirect="list">
    <SimpleForm>
      <TextInput source="label" />
    </SimpleForm>
  </Edit>
);
