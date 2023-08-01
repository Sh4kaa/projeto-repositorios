import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";
import { useCallback, useEffect, useState } from "react";

import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const reposLocal = localStorage.getItem("repos");
    if (reposLocal) {
      setRepositorios(JSON.parse(reposLocal));
    }
  }, []);

  //componente sendo atualizado
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  function handleInputChange({ target }) {
    setNewRepo(target.value);
    setAlert(null);
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);
      setRepositorios(find);
    },
    [repositorios]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function submit() {
        try {
          if (newRepo === "") {
            throw new Error("Você precisa digitar um repositório");
          }
          setLoading(true);
          setAlert(null);
          const response = await api.get(`/repos/${newRepo}`);
          const hasRepo = repositorios.find((r) => r.name === newRepo);
          if (hasRepo) {
            throw new Error("Repositório duplicado");
          }
          const data = {
            name: response.data.full_name,
          };
          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
          setAlert(true);
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
      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          value={newRepo}
          onChange={handleInputChange}
          placeholder="ex: facebook/react"
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner size={14} color="#fff" />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
