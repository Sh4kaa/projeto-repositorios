import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import { useCallback, useState } from "react";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);

  function handleInputChange({ target }) {
    setNewRepo(target.value);
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit() {
      const response = await api.get(`/repos/${newRepo}`);      
      const data = {
        name: response.data.full_name,
      };
      setRepositorios([...repositorios, data]);
      setNewRepo("");
    }
    console.log(repositorios);
    submit();
  }, [repositorios, newRepo]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" value={newRepo} onChange={handleInputChange} />

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
