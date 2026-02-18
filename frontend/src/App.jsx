import { useEffect } from "react";
import API from "./services/api";

function App() {

  useEffect(() => {
    API.get("/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return <h1>InfraScale Frontend</h1>;
}

export default App;
