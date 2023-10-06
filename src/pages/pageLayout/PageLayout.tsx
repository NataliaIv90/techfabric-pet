import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Main, PageLayoutContainer } from './PageLayout.styled';

export const PageLayout = () => {
  return (
    <PageLayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </PageLayoutContainer>
  );
};
