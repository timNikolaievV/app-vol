import Home from "./pages/Home";
import StorageEdit from "./pages/Storage/StorageEdit";
import StorageList from "./pages/Storage/StorageList";


export const routes = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: Home,
  },
  {
    key: "storages-route",
    title: "Storages",
    path: "/storages",
    enabled: true,
    component: StorageList,
  },
  {
    key: "storages-edit-route",
    title: "StorageEdit",
    path: "/storages/edit/:id",
    enabled: true,
    component: StorageEdit,
  },
];
