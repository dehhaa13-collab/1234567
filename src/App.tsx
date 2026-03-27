import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

export const App = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default App;
