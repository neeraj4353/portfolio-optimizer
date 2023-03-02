import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from '../assets/svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidation } from '../helpers/validationSchemas';
// import '../index.scss';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <div className="cards">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img alt="logo" src={'/images/nagarro.svg'} width={100} />
        </div>
        {/* <h4>Portfolio Optimizer</h4> */}
        <h2>Login to Portfolio Optimizer</h2>
        <h3>Please enter the credentials to continue.</h3>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginValidation}
          onSubmit={() => {
            handleLogin();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                Relationship Manager ID
                <Field
                  type="text"
                  name="username"
                  placeholder="Relationship Manager ID"
                />
                <ErrorMessage
                  className="error-message"
                  name="username"
                  component="div"
                />
              </label>
              <label>
                Password
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  className="error-message"
                  name="password"
                  component="div"
                />
              </label>
              <label className="checkbox-label">
                <Field type="checkbox" name="rememberme" />
                Remember Me?
              </label>
              <div className="ctas">
                <button type="submit" disabled={isSubmitting}>
                  Login <ChevronRight />
                </button>
                <Link to="/">Sign Up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
