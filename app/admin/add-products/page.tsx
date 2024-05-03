import { getCurrentUser } from "@/actions";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import NullData from "@/app/components/NullData";
import { AddProductForm } from "./AddProductForm";

export default async function AddProductsPage() {
    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Oops! Acceso denegado"/>;
    }
  return (
    <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm />
            </FormWrap>
        </Container>
    </div>
  )
}