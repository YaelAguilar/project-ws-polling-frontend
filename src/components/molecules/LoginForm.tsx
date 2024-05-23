import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useUser } from '../../hooks/useUser';
import { showAlert } from '../../utils/alertService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
        showAlert('¡Éxito!', 'Sesión iniciada correctamente', 'success');
        navigate('/');
      } else {
        showAlert('Error', data.message || 'Usuario o contraseña incorrectos', 'error');
      }
    } catch (error) {
      console.error('Login Error:', error);
      showAlert('Error', 'No se pudo conectar al servidor', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="bg-white text-gray-900"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="bg-white text-gray-900"
      />
      <div className="flex justify-center">
        <Button onClick={handleLogin}>Login</Button>
      </div>
      <div className="text-right text-white mt-4">
        ¿No tienes una cuenta? 
        <Link to="/register" className="text-blue-500 hover:text-blue-700">Regístrate</Link>
      </div>
    </div>
  );
};

export default LoginForm;
