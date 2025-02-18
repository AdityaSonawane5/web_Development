import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
