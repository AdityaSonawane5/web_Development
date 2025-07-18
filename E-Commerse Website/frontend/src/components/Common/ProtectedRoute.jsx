// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// const ProtectedRoute = ({ childern, role }) => {
//   const { user } = useSelector((state) =>  state.auth );

//   if (!user || (role && user.role !== role)) {
//     return <Navigate to="/login" replace />;
//   }
//   return childern;
// }

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
