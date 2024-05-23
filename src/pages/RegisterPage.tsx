import RegisterForm from '../components/molecules/RegisterForm';
import AuthContainer from '../components/organisms/AuthContainer';

const RegisterPage: React.FC = () => {
  return (
    <AuthContainer title="Register">
      <RegisterForm />
    </AuthContainer>
  );
}

export default RegisterPage;
