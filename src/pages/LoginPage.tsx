import LoginForm from '../components/molecules/LoginForm';
import AuthContainer from '../components/organisms/AuthContainer';

const LoginPage: React.FC = () => {
  return (
    <AuthContainer title="Login">
      <LoginForm />
    </AuthContainer>
  );
}

export default LoginPage;
