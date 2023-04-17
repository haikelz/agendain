import { BrowserRouter, Route, Routes } from "react-router-dom";
import Archive from "./pages/Archive";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
