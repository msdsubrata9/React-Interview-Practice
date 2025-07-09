import Image from "next/image";
import styles from "./page.module.css";
import Products from "./components/Products";
import ProductsServer from "./components/ProductsServer";

export default function Home() {
  return (
    <div>
      {/* <Products /> */}
      <ProductsServer />
    </div>
  );
}
