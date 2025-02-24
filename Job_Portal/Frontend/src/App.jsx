import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login';
import Jobs from './components/Jobs.jsx';

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
  {
    path:'/jobs',
    element:<Jobs/>
  }
]);

function App() {
  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
