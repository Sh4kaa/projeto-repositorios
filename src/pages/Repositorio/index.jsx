import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList } from "./style";
import { FaArrowLeft } from "react-icons/fa";

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

  if (loading)
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img src={repos.owner.avatar_url} alt={repos.owner.login} />
        <h1>{repos.name}</h1>
        <p>{repos.description}</p>
      </Owner>
      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
    </Container>
  );
}
