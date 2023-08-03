import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading } from "./style";

export default function Repositorio() {
  const [repos, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { repositorio } = useParams();
  useEffect(() => {
    async function load() {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setIssues(issuesData.data);
      setRepo(repositorioData.data);

      setLoading(false);
    }

    load();
  }, [repositorio]);

  if (loading) return <Loading>Carregando</Loading>;

  return (
    <Container>
      <Owner>
        <img src={repos.owner.avatar_url} alt={repos.owner.login} />
        <h1>{repos.name}</h1>
        <p>{repos.description}</p>
      </Owner>
    </Container>
  );
}
