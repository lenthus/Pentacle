import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash/splash';
import Home from '../components/Home/Home';
import Email from '../components/Email/Email';
import Contacts from '../components/Contacts/Contacts';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "splash",
        element: <Splash />
      },
      {
        path: "Email",
        element: <Email />,
      },
      {
        path: "Contacts",
        element: <Contacts />
      }
    ],
  },
]);
