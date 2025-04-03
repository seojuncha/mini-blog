import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    console.log("loaded first!");
    axios
      .get("http://localhost:3000/")
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        console.log("always!");
      });
  }, []);

  return (
    <>
      <h1>First Page</h1>
    </>
  );
}

export default App;
