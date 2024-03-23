import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
import ManageForm from "./components/ManageForm";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-forms" element={<CreateForm />} />
        <Route path="/manage-forms" element={<ManageForm />} />
      </Routes>
    </div>
  );
}

export default App;
