import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { getCurrentUserId, getUserById } from "../store/users";
import { UsersLoader } from "../components/hoc";

import ProductList from "../views/productList/ProductList";
import CreatedProduct from "../views/createProduct/CreatedProduct";
import AdminPage from "../views/admin/AdminPage";

const AdminRouting = (props) => {
  const currentUserId = useSelector(getCurrentUserId());
  const currentUserById = useSelector(getUserById(currentUserId));

  const admin = currentUserById.admin;

  return (
    <UsersLoader>
      {admin ? (
        <>
          <Route path="/admin/upload" component={CreatedProduct} />
          <Route path="/admin/list_product" component={ProductList} />
          <Route path="/admin" exact component={AdminPage} />
        </>
      ) : (
        <Redirect path="/" />
      )}
    </UsersLoader>
  );
};

export default AdminRouting;
