import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { OrdersClient } from "./OrdersClient";


export default async function OrdersPage() {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return <NullData title="Oops! Acceso denegado"/>;
  }
  const orders = await getOrdersByUserId(currentUser.id);

  if(!currentUser){
    return <NullData title="Aún no hay ordenes.."/>;
  }
  return (
    <div className="p-8">
      <Container>
        <OrdersClient orders={orders}/>
      </Container>
    </div>
  );
}