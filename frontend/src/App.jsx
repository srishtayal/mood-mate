import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup       from './pages/Signup';
import Login        from './pages/Login';
// import Landing      from './pages/Landing';
import HomeRoute   from './components/HomeRoute';
import Dashboard    from './pages/Dashboard';
import NewEntry     from './pages/NewEntry';
import ViewJournal  from './pages/ViewJournal';  
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import StartReflection from './pages/StartReflection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signup"     element={<Signup  />} />
          <Route path="/login"      element={<Login   />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/new-entry"
            element={
              <PrivateRoute>
                <NewEntry />
              </PrivateRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <ViewJournal />
              </PrivateRoute>
            }
          />

          <Route
            path="/reflection"
            element={
              <PrivateRoute>
                <StartReflection />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
