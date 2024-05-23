
interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 text-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthContainer;
