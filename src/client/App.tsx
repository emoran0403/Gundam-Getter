import * as React from "react";
import { useState, useEffect } from "react";

const App = (props: AppProps) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const startProcess = () => {
    fetch(`/gundamget`)
      .then((res) => {
        setPressed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="container my-5">
      <h1 className="text-primary text-center">Welcome to Gundam Getter!</h1>
      <h3 className="text-primary text-center">Hit that button start the process</h3>
      <div className="d-flex justify-content-center">
        {pressed ? (
          <div>OK! working on it, check the sheet in a few minutes</div>
        ) : (
          <button
            className="btn btn-primary my-2"
            onClick={() => {
              startProcess();
            }}
          >
            Gundam Get!
          </button>
        )}
      </div>
    </main>
  );
};

interface AppProps {}

export default App;
