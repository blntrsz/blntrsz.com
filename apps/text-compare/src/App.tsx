import { Component, createSignal, For } from "solid-js";
import { diffChars } from "diff";

const getDiffClass = (part: Diff.Change) => {
  if (part.added) {
    return "diff added";
  }

  if (part.removed) {
    return "diff removed";
  }

  return "";
};

const App: Component = () => {
  const [getInput1, setInput1] = createSignal("");
  const [getInput2, setInput2] = createSignal("");

  return (
    <div class="page">
      <div class="textarea-wrapper">
        <textarea
          class="textarea-left inverse-colors"
          onInput={(e) => setInput1(e.currentTarget.value)}
        />
        <textarea
          class="textarea-right inverse-colors"
          onInput={(e) => setInput2(e.currentTarget.value)}
        />
      </div>
      {getInput1() && getInput2() && (
        <div class="diff-wrapper">
          <For each={diffChars(getInput1(), getInput2())}>
            {(value) => <span class={getDiffClass(value)}>{value.value}</span>}
          </For>
        </div>
      )}
    </div>
  );
};

export default App;
