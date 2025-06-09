import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Button,
  useRecordContext,
  useRedirect,
  useNotify,
} from "react-admin";
import BlockIcon from "@mui/icons-material/Block";
import { User } from "../../types";
import dataProvider from "../../dataProvider";

const BlockButton = () => {
  const record = useRecordContext<User>();
  const redirect = useRedirect();
  const notify = useNotify();
  if (!record) return null;

  return (
    <Button
      label={record.status === "active" ? "Block" : "Unblock"}
      onClick={() => {
        dataProvider.custom.toggleBlockUser(record.id).then((res: any) => {
          if (res?.error) {
            notify(res?.error, { type: "error" });
          } else {
            notify(res?.data, { type: "success" });
            redirect("list");
          }
        });
      }}
    >
      <BlockIcon />
    </Button>
  );
};

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="number" />
      <TextField source="job" />
      <TextField source="facebookAccount" />
      <TextField source="status" />
      <TextField source="type" />
      <BlockButton />
    </Datagrid>
  </List>
);
