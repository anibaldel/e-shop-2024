import Container from "@/app/components/Container";
import { ManageProductsClient } from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions";
import NullData from "@/app/components/NullData";

export default async function ManageProdudtsPage() {

  const products = await getProducts({category: null})
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title="Oops! Acceso denegado"/>;
}
  return (
    <div className="p-8">
      <Container>
        <ManageProductsClient products={products}/>
      </Container>
    </div>
  );
}