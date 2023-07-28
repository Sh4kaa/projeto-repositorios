import { BrowserRouter, Routes as Routs, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Routs>
        <Route path="/" element={<Main />} />
        <Route path="/repositorio/:repositorio" element={<Repositorio />} />
      </Routs>
    </BrowserRouter>
  );
}
