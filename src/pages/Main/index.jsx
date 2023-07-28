import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>
      <Form onSubmit={() => {}}>
        <input type="text" />
        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
