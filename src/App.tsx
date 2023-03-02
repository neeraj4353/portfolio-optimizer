import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  Dashboard,
  Login,
  BuildPortfolio,
  ReviewPortfolio,
  InitialPortfolio
} from './pages';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import './light.scss';

function App() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/initial-portfolio/:id" element={<InitialPortfolio />} />
          <Route path="/build-portfolio/:id" element={<BuildPortfolio />} />
          <Route path="/review-portfolio/:id" element={<ReviewPortfolio />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
