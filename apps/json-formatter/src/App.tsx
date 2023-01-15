import { useState, ChangeEventHandler } from "react";
import ReactJson from "react-json-view";

function App() {
  const [json, setJson] = useState({});
  const [error, setError] = useState<string>("");

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    try {
      setJson(JSON.parse(e.target.value));
      setError("");
    } catch (e) {
      setError((e as { message: string }).message);
    }
  };

  return (
    <main>
      <textarea onChange={onChange} />
      <div className={`validator${error ? " error" : " valid"}`}>
        <Validator error={error} />
      </div>
      <ReactJson theme="monokai" src={json} />
    </main>
  );
}

const Validator = ({ error }: { error?: string }) => {
  if (error) {
    return (
      <details>
        <summary>It has error!</summary>
        <span>{JSON.stringify(error)}</span>
      </details>
    );
  }

  return <div>No error</div>;
};

export default App;
