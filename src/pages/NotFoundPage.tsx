import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">404 - Página no encontrada</h1>
      <p className="mb-4">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;
