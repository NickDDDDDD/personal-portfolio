import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../../../store/closureSlice";
import useClosure from "../../../hooks/useClosure";

const Closure = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <CounterClosure />
      <div className="flex gap-4">
        <ReduxClosureGet />
        <ReduxClosureSend />
        <ReduxClosureSubscribe />
      </div>
    </div>
  );
};

const CounterClosure = () => {
  const [count, setCount] = useState(0);
  const [loggedCount, setLoggedCount] = useState(0);
  const [status, setStatus] = useState("not logged");

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const logLater = () => {
    setStatus("waiting");
    setTimeout(() => {
      setLoggedCount(count);
      setStatus("logged");
    }, 5000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          className="cursor-pointer rounded-full bg-blue-300 px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
          onClick={increment}
        >
          count++
        </button>
        <p>{`real count ${count}`}</p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          className="cursor-pointer rounded-full bg-blue-300 px-4 py-2 hover:bg-blue-400 active:bg-blue-200"
          onClick={logLater}
        >
          log after 5s
        </button>
        <p>{`log count ${loggedCount}, status ${status}`}</p>
      </div>
    </div>
  );
};

const ReduxClosureGet = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { getUsername } = useClosure();

  const { username } = useSelector((state) => state.closure);

  const onInputValueChage = (e) => {
    setInputValue(e.target.value);
  };

  const hookUsername = getUsername();

  return (
    <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-100">
      <p>{`username in store: ${username}`}</p>
      <p>{`username get by hook: ${hookUsername}`}</p>

      <input
        className="rounded-full bg-neutral-700 px-4 py-2 text-xl"
        type="text"
        value={inputValue}
        onChange={onInputValueChage}
      />
      <button
        className="cursor-pointer rounded-full bg-red-500 px-4 py-2"
        onClick={() => {
          dispatch(setUsername(inputValue));
          setInputValue("");
        }}
      >
        set username
      </button>
    </div>
  );
};

const ReduxClosureSend = () => {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useClosure();

  const onInputValueChage = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-100">
      <input
        className="rounded-full bg-neutral-700 px-4 py-2 text-xl"
        type="text"
        value={inputValue}
        onChange={onInputValueChage}
      />
      <button
        className="w-full cursor-pointer rounded-full bg-red-500 px-4 py-2"
        onClick={() => {
          sendMessage(inputValue);
          setInputValue("");
        }}
      >
        send message
      </button>
    </div>
  );
};

const ReduxClosureSubscribe = () => {
  const [inputValue, setInputValue] = useState("");
  const { subscribeToTopic } = useClosure();

  const onInputValueChage = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex w-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900 p-4 text-neutral-100">
      <input
        className="rounded-full bg-neutral-700 px-4 py-2 text-xl"
        type="text"
        value={inputValue}
        onChange={onInputValueChage}
      />
      <button
        className="w-full cursor-pointer rounded-full bg-red-500 px-4 py-2"
        onClick={() => {
          subscribeToTopic(inputValue);
          setInputValue("");
        }}
      >
        subscribe to topic
      </button>
    </div>
  );
};

export default Closure;
