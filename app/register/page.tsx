import { getCurrentUser } from "@/actions";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import { RegisterForm } from "./RegisterForm";


export default async function RegisterPage() {
  const currentUser = await getCurrentUser();
  return (
    <Container>
        <FormWrap>
            <RegisterForm currentUser={currentUser}/>
        </FormWrap>
    </Container>
  );
}