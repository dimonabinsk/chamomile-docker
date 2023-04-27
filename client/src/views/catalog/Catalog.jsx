import { useParams } from "react-router-dom";
import ProductPage from "./productPage/ProductPage";
import CatalogPage from "./catalogPage/CatalogPage";

const Catalog = () => {
  const { plantId } = useParams();
  return plantId ? <ProductPage plantId={plantId} /> : <CatalogPage />;
};

export default Catalog;
