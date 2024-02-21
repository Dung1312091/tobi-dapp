import "./App.css";
import { ConnectButton } from "./components/ConnectButton";
import { Header } from "./components/Header";
import { Sent } from "./components/Sent";

function App() {
  return (
    <main>
      <Header>
        <ConnectButton />
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <Sent />
      </div>
    </main>
  );
}

export default App;
