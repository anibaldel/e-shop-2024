import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import { CheckoutClient } from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <div>
      <Container>
        <FormWrap>
            <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
}