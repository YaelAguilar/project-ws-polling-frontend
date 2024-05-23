import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useUser } from '../../hooks/useUser';
import { showAlert } from '../../utils/alertService';

interface RegisterData {
  message?: string;
  token?: string;
}

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password })
      });
      const data: RegisterData = await response.json();
      if (response.status === 201) {
        showAlert('¡Registrado!', 'Usuario registrado correctamente', 'success');
        if (data.token) {
          login(data.token);
          navigate('/');
        } else {
          showAlert('Error', 'No se recibió el token de autenticación', 'error');
        }
      } else {
        showAlert('Error', data.message || 'Error desconocido al intentar registrar', 'error');
      }
    } catch (error) {
      console.error('Register Error:', error);
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
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        <Button onClick={handleRegister}>Register</Button>
      </div>
      <div className="text-right text-white mt-4">
        ¿Ya tienes una cuenta?
        <Link to="/login" className="text-blue-500 hover:text-blue-700">Iniciar sesión</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
