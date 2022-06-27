import { Route, Routes } from "react-router-dom";
import "./App.css";
import Planning from "./pages/Planning";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return (
    <Routes>
      <Route path="*" element={<Planning />} />
    </Routes>
  );
}

export default App;
