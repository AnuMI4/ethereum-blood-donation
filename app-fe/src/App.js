import BloodDonorApp from "./components/BloodDonorApp";
import Menu from "./components/Menu";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/check-eligibility' element={<BloodDonorApp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
