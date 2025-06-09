import { Admin, Resource } from "react-admin";
import { UserList } from "./resources/users/UserList";
import { JobList, JobCreate, JobEdit } from "./resources/jobs/JobList";
import {
  PostTypeList,
  PostTypeCreate,
  PostTypeEdit,
} from "./resources/postTypes/PostTypeList";
import {
  LocationList,
  LocationCreate,
  LocationEdit,
} from "./resources/locations/LocationList";
import { BuildingList, BuildingShow } from "./resources/buildings/BuildingList";
import { ContactRequestList } from "./resources/contactRequests/ContactRequestList";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="users" list={UserList} icon={PeopleIcon} />
      <Resource
        name="jobs"
        list={JobList}
        create={JobCreate}
        edit={JobEdit}
        icon={WorkIcon}
      />
      <Resource
        name="post-types"
        list={PostTypeList}
        create={PostTypeCreate}
        edit={PostTypeEdit}
        icon={CategoryIcon}
      />
      <Resource
        name="locations"
        list={LocationList}
        create={LocationCreate}
        edit={LocationEdit}
        icon={LocationOnIcon}
      />
      <Resource
        name="posts"
        list={BuildingList}
        show={BuildingShow}
        icon={HomeIcon}
      />
      <Resource
        name="contact-requests"
        list={ContactRequestList}
        icon={ContactMailIcon}
      />
    </Admin>
  );
};

export default App;
