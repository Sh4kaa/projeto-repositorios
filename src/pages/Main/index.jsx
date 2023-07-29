import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import { useCallback, useState } from "react";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleInputChange({ target }) {
    setNewRepo(target.value);
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function submit() {
        try {
          setLoading(true);
          const response = await api.get(`/repos/${newRepo}`);
          const data = {
            name: response.data.full_name,
          };
          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [repositorios, newRepo]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" value={newRepo} onChange={handleInputChange} />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner size={14} color="#fff" />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
