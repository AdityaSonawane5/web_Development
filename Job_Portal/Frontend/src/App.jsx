import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx';

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
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/profile",
    element:<Profile/>
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
