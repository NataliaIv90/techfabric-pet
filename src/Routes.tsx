import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageLayout } from './pages/pageLayout/PageLayout';
import { Login } from './pages/auth/login/Login';
import { Register } from './pages/auth/register/Register';
import { RegistrationConfirmation } from './pages/auth/registrationConfirmation/RegistrationConfirmation';
import { RegistrationConfirmed } from './pages/auth/registrationConfirmed/RegistrationConfirmed';
import { PasswordRecovery } from './pages/auth/passwordRecovery/PasswordRecovery';
import { NewPassword } from './pages/auth/newPassword/NewPassword';
import { PasswordRecoveryNotification } from './pages/auth/passwordRecoveryNotification/PasswordRecoveryNotification';
import { AuthorizedSection, UserRole } from './pages/AuthorizedSection';
import { EAuthRoutes } from './shared/constants/routes';
import { ArticleList } from './pages/articleList/articleList/ArticleList';
import { ArticleFullInfo } from './pages/articleFullInfo/ArticleFullInfo';
import { CreateArticle } from './pages/createArticle/CreateArticle';
import { ArticlePublicationConfirmation } from './pages/auth/ArticlePublicationConfirmation/ArticlePublicationConfirmation';
import { Search } from './pages/search/Search';
import { EditUserList } from './pages/editUserList/EditUserList';
import { Favorite } from './pages/favorite/Favorite';
import { ProfilePage } from './pages/profilePage/ProfilePage';
import { ContactUs } from './pages/auth/contactUs/ContactUs';
import { PrivacyPolicy } from './pages/auth/privacyPolicy/PrivacyPolicy';
import { Rules } from './pages/auth/rules/Rules';
import { TermsOfUse } from './pages/auth/termsOfUse/TermsOfUse';
import { NotFoundPage } from './pages/notFound/NotFoundPage';
import { EditArticleList } from './pages/editArticleList/EditArticlesList';

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    path: '/',
    children: [
      {
        element: <Navigate to='articles' />,
        path: '/',
      },
      {
        element: <ArticleList />,
        path: 'articles',
        index: true,
      },
      {
        path: 'articles/:articleId',
        element: <ArticleFullInfo />,
      },
      {
        path: 'confirm/:email',
        element: <RegistrationConfirmation />,
      },
      {
        path: EAuthRoutes.Confirmation,
        element: <RegistrationConfirmed />,
      },
      {
        path: 'favorites',
        element: <AuthorizedSection allowedRoles={[UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]} />,
        children: [{ element: <Favorite />, index: true }],
      },
      {
        path: 'create-article',
        element: <AuthorizedSection allowedRoles={[UserRole.AUTHOR, UserRole.ADMIN]} />,
        children: [{ element: <CreateArticle />, index: true }],
      },
      {
        path: 'article-created',
        element: <ArticlePublicationConfirmation />,
      },
      {
        path: 'edit-userlist',
        element: <AuthorizedSection allowedRoles={[UserRole.ADMIN]} />,
        children: [{ element: <EditUserList />, index: true }],
      },
      {
        path: 'edit-articlelist',
        element: <AuthorizedSection allowedRoles={[UserRole.ADMIN]} />,
        children: [{ element: <EditArticleList />, index: true }],
      },
      {
        path: EAuthRoutes.Register,
        element: <Register />,
      },
      {
        path: EAuthRoutes.RecoveryPass,
        element: <PasswordRecovery />,
      },
      {
        path: 'reset-password/:params',
        element: <NewPassword />,
      },
      {
        path: EAuthRoutes.RecoveryNotification,
        element: <PasswordRecoveryNotification />,
      },
      {
        path: EAuthRoutes.Login,
        element: <Login />,
      },
      {
        path: 'profile',
        element: <AuthorizedSection allowedRoles={[UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]} />,
        children: [{ element: <ProfilePage />, index: true }],
      },
      {
        path: 'rules',
        element: <Rules />,
      },
      {
        path: 'privacy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'termsOfUse',
        element: <TermsOfUse />,
      },
      {
        path: 'contact',
        element: <ContactUs />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'settings',
        element: <AuthorizedSection allowedRoles={[UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]} />,
        children: [{ element: <div>Settings</div>, index: true }],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
