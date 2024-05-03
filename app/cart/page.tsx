import { getCurrentUser } from "@/actions";
import Container from "../components/Container";
import { CartClient } from "./CartClient";



export default async function CartPage() {
  const currentUser = await getCurrentUser();
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser}/>
      </Container>
    </div>
  );
}