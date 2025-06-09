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
  useNotify,
  useRefresh,
} from "react-admin";
import { Building } from "../../types";
import BlockIcon from "@mui/icons-material/Block";
import dataProvider from "../../dataProvider";

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
  const notify = useNotify();
  const refresh = useRefresh();
  if (!record) return null;

  return (
    <Button
      label={record.status === "active" ? "Block" : "Activate"}
      onClick={() => {
        if (record.status === "active") {
          dataProvider.custom.deletePost(record.id).then((res: any) => {
            if (res?.error) {
              notify(res?.error, { type: "error" });
            } else {
              notify(res?.data, { type: "success" });
              refresh();
            }
          });
        } else {
          dataProvider.custom.acceptPost(record.id).then((res: any) => {
            if (res?.error) {
              notify(res?.error, { type: "error" });
            } else {
              notify(res?.data, { type: "success" });
              refresh();
            }
          });
        }
      }}
    >
      <BlockIcon />
    </Button>
  );
};

export const BuildingList = () => (
  <List resource="posts/admin/all" filters={BuildingFilter}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="title" />
      <ReferenceField source="locationId" reference="locations">
        <TextField source="label" />
      </ReferenceField>
      <TextField source="description" />
      <TextField source="PostType.label" />
      <NumberField source="price" />
      <NumberField source="space" />
      <NumberField source="numberOfRooms" label="Rooms" />
      <NumberField source="numberOfBathrooms" label="Bathrooms" />
      <NumberField source="numberOfKitchens" label="Kitchens" />
      <BooleanField source="furnished" />
      <BooleanField source="garden" />
      <BooleanField source="pool" />
      <TextField source="status" />
      <TextField source="User.number" />
      <TextField source="User.name" />
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
      <TextField source="PostType.label" />
      <NumberField source="price" />
      <NumberField source="space" />
      <NumberField source="numberOfRooms" label="Rooms" />
      <NumberField source="numberOfBathrooms" label="Bathrooms" />
      <NumberField source="numberOfKitchens" label="Kitchens" />
      <BooleanField source="furnished" />
      <BooleanField source="garden" />
      <BooleanField source="pool" />
      <TextField source="status" />
      <TextField source="User.number" />
      <TextField source="User.name" />
    </SimpleShowLayout>
  </Show>
);
