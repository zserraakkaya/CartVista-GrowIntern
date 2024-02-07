import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart";
import SignInSignUp from "./Pages/SignInSignUp";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/cart" component={<Cart />} />
          <Route path="/signinsignup" component={<SignInSignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
