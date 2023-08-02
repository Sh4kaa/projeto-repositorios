import { useEffect } from "react";


import api from "../../services/api";
import { useParams } from "react-router-dom";
import { Container } from "./style";

export default function Repositorio() {
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

      console.log(repositorioData.data);
      console.log(issuesData.data);

     
    }

    load();
  }, [repositorio]);

  return <Container>{repositorio}</Container>;
}
