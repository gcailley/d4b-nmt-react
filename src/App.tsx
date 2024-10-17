import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import reactLogo from "./assets/react.svg";
import CustomWebcam from "./components/CustomWebcam";
import Message from "./components/Message";
import { messaging } from "./firebase/firebaseConfig";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const [myToken, setToken] = useState("");
  async function requestPermissionNotification() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
      });
      setToken(token);
      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  onMessage(messaging, (payload) => {
    console.log("incoming msg", payload);
    toast(<Message notification={payload.notification} />);
  });

  // PARTIE CAMERA

  useEffect(() => {
    requestPermissionNotification();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      token : {myToken}
      <br></br>
      <ToastContainer />
      <CustomWebcam />
    </>
  );
}

export default App;
