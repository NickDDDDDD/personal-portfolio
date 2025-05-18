import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const useClosure = () => {
  const { username } = useSelector((state) => state.closure);

  const handleResponse = useCallback(
    (response) => {
      switch (response.type) {
        case "message":
          console.log("message: ", response.message);
          console.log("from: ", response.from);
          console.log("username in handleResponse: ", username);
          break;

        default:
          console.log("default: ", response);
      }
    },
    [username]
  );

  const subscribeToTopic = useCallback(
    (topic) => {
      console.log("subscribeToTopic called");
      subscribe(topic, handleResponse);
    },
    [handleResponse]
  );

  useEffect(() => {
    console.log("📌 handleResponse changed:");
  }, [handleResponse]);

  useEffect(() => {
    console.log("📌 subscribeToTopic changed:");
  }, [subscribeToTopic]);

  const subscribe = (topic, callback) => {
    console.log(`📡 Subscribed to topic: ${topic}`);

    const intervalId = setInterval(() => {
      const mockResponse = {
        type: "message",
        message: "Hello from the server!",
        from: "other",
        timestamp: new Date().toISOString(),
      };

      console.log(`📨 Message received on topic: ${topic}`);
      callback(mockResponse);
    }, 5000);

    return () => clearInterval(intervalId);
  };

  const getUsername = () => {
    return username;
  };

  const sendMessage = (message) => {
    if (!message) {
      console.error("Message is a falsy value");
      return;
    }
    const body = {
      message,
      username,
    };

    console.log("sendMessage: ", body);
  };
  return { getUsername, sendMessage, subscribeToTopic };
};

export default useClosure;
