import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const ProtectedRoutes = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div><Spinner /></div>
    }

    if (!user) {
        toast.error('Please login to continue')
        return <Navigate to='/admin' replace />
    }

    return (children);
}

export default ProtectedRoutes