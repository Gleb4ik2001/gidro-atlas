import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from './auth/protectedRouters.jsx'
import {AuthProvider} from './auth/hooks.jsx';
import Login from './auth/pages/login.jsx';
import Dashboard from './core/dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute >
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
        <Login />
    ),
  },
]);

 const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
