import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
  const [devs, setDevs] = useState([]);

  async function loadDevs() {
    const res = await api.get("/devs");
    setDevs(res.data);
  }

  useEffect(() => {
    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const res = await api.post("/devs", data);
    setDevs([...devs, res.data]);
  }

  return (
    <main id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </main>
  );
}

export default App;
