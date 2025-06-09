import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ImageField,
  ReferenceField,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  Button,
  useRecordContext,
} from "react-admin";
import { Building } from "../../types";
import BlockIcon from "@mui/icons-material/Block";

const BuildingFilter = [
  <TextInput source="q" label="Search" alwaysOn />,
  <TextInput source="title" />,
  <ReferenceInput source="locationId" reference="locations">
    <SelectInput optionText="label" />
  </ReferenceInput>,
  <ReferenceInput source="typeId" reference="postTypes">
    <SelectInput optionText="label" />
  </ReferenceInput>,
  <NumberInput source="price" />,
  <SelectInput
    source="status"
    choices={[
      { id: "active", name: "Active" },
      { id: "pending", name: "Pending" },
      { id: "blocked", name: "Blocked" },
    ]}
  />,
];

const StatusButton = () => {
  const record = useRecordContext<Building>();
  if (!record) return null;

  return (
    <Button
      label={record.status === "active" ? "Block" : "Activate"}
      onClick={() => {
        // Handle status change
      }}
    >
      <BlockIcon />
    </Button>
  );
};

export const BuildingList = () => (
  <List filters={BuildingFilter}>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <ReferenceField source="locationId" reference="locations">
        <TextField source="label" />
      </ReferenceField>
      <TextField source="description" />
      <ReferenceField source="typeId" reference="postTypes">
        <TextField source="label" />
      </ReferenceField>
      <NumberField source="price" />
      <NumberField source="space" />
      <NumberField source="numberOfRooms" label="Rooms" />
      <NumberField source="numberOfBathrooms" label="Bathrooms" />
      <NumberField source="numberOfKitchens" label="Kitchens" />
      <BooleanField source="furnished" />
      <BooleanField source="garden" />
      <BooleanField source="pool" />
      <TextField source="status" />
      <TextField source="userNumber" />
      <TextField source="userName" />
      <StatusButton />
    </Datagrid>
  </List>
);

export const BuildingShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <ReferenceField source="locationId" reference="locations">
        <TextField source="label" />
      </ReferenceField>
      <TextField source="description" />
      <ImageField source="images" src="url" />
      <ReferenceField source="typeId" reference="postTypes">
        <TextField source="label" />
      </ReferenceField>
      <NumberField source="price" />
      <NumberField source="space" />
      <NumberField source="numberOfRooms" label="Rooms" />
      <NumberField source="numberOfBathrooms" label="Bathrooms" />
      <NumberField source="numberOfKitchens" label="Kitchens" />
      <BooleanField source="furnished" />
      <BooleanField source="garden" />
      <BooleanField source="pool" />
      <TextField source="status" />
      <TextField source="userNumber" />
      <TextField source="userName" />
    </SimpleShowLayout>
  </Show>
);
