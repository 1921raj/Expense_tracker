 
import Login from '../components/Login';

const LoginPage = ({ setUser }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Login setUser={setUser} />
    </div>
  );
};

export default LoginPage;