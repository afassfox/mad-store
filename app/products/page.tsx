import { stripe } from "@/lib/stripe";
import { ProductList } from "@/components/product-list";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div>
      <ProductList products={products.data}></ProductList>
    </div>
  );
}
