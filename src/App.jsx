import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CreateElection from "./components/CreateElection";
import Elections from "./components/Elections";
import { Toaster } from "react-hot-toast";

const App = () => {
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>;
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to={"/"}>Elections</Link>
        <Link to={"/create"}>+ Election</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Elections />} />
        <Route path="/create" element={<CreateElection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
