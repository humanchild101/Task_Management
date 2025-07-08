import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserManagementPage from "./pages/UserManagementPage/UserManagementPage";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
