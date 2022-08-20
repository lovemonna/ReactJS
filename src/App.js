import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/signup" element ={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </main>
  );
}
export default App;
