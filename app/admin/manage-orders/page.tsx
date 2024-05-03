import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import { ManageOrdersClient } from "./ManageOrdersClient";

export default async function ManageOrdersPage() {

  const orders = await getOrders()
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title="Oops! Acceso denegado"/>;
}
  return (
    <div className="p-8">
      <Container>
        <ManageOrdersClient orders={orders}/>
      </Container>
    </div>
  );
}