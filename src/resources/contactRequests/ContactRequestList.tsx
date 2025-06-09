import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SelectInput,
  Button,
  useRecordContext,
  NumberField,
  useRefresh,
  useNotify,
} from "react-admin";
import { ContactRequest } from "../../types";
import UpdateIcon from "@mui/icons-material/Update";
import dataProvider from "../../dataProvider";

const ContactRequestFilter = [
  <SelectInput
    source="status"
    choices={[
      { id: "pending", name: "Pending" },
      { id: "active", name: "Active" },
      { id: "done", name: "Done" },
    ]}
  />,
];

const StatusButton = () => {
  const record = useRecordContext<ContactRequest>();
  const refresh = useRefresh();
  const notify = useNotify();

  if (!record) return null;
  const nextStatus = {
    pending: "active",
    active: "done",
    done: "done",
  }[record.status];

  return (
    <Button
      label={`Set ${nextStatus}`}
      onClick={() => {
        if (nextStatus === "active") {
          dataProvider.custom
            .acceptContactRequest(record.id)
            .then((res: any) => {
              if (res?.error) {
                notify(res?.error, { type: "error" });
              } else {
                refresh();
                notify(res?.data, { type: "success" });
              }
            });
        } else if (nextStatus === "done") {
          dataProvider.custom
            .completeContactRequest(record.id)
            .then((res: any) => {
              if (res?.error) {
                notify(res?.error, { type: "error" });
              } else {
                refresh();
                notify(res?.data, { type: "success" });
              }
            });
        }
      }}
      disabled={record.status === "done"}
    >
      <UpdateIcon />
    </Button>
  );
};

export const ContactRequestList = () => (
  <List filters={ContactRequestFilter}>
    <Datagrid bulkActionButtons={false}>
      <NumberField source="id" />
      <NumberField source="Post.id" />
      <TextField source="Post.title" />
      <TextField source="Post.seller.name" />
      <TextField source="Post.seller.number" />
      <TextField source="User.name" />
      <TextField source="User.number" />
      <TextField source="status" />
      <StatusButton />
    </Datagrid>
  </List>
);
