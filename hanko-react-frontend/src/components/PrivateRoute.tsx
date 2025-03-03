import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
  }


function PrivateRoute({ children }: PrivateRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
  
    useEffect(() => {
      fetch('http://localhost:5001/validate', {
        credentials: 'include', // This is required to include the cookie in the request
      })
        .then((res) => {
          setIsAuthenticated(res.ok);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }, []);
  
    if (isAuthenticated === null) {
      return null; // Or a loading spinner
    }
  

    if(isAuthenticated){
        return <>{children}</>
    }
    else{
        return <Navigate to="/" replace state={{ from: location }} />
    }
  }
  
  export default PrivateRoute;