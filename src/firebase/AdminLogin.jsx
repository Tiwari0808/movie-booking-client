import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser,user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        return toast.error('Please Enter Email')
      }
      if (!password) {
        return toast.error('Please Enter Password')
      }
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      navigate('/admin/addShows')
      toast.success('Logged in successfully!');
    } catch (error) {
      setEmail('');
      setPassword('')
      return toast.error(error.message);
    }
  };

  return (
    <div className='flex justify-center py-[5%]'>
      <div className='border border-primary max-w-[250px] h-[300px]  rounded-[10px] flex flex-col items-center justify-evenly'>
        <div>
          <h2 className='text-[26px]'>Login</h2>
        </div>
        <div className='flex justify-center'>
          <form onSubmit={handleLogin} className="flex justify-center items-center flex-col gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded border w-[80%]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded border w-[80%]"
            />
            <button type="submit" className="bg-primary text-white py-2 rounded w-[50%] cursor-pointer hover:bg-primary-dull">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AdminLogin;
