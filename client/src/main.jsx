import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ChakraProvider } from '@chakra-ui/react'
import CreateTodoPage from './pages/CreateTodoPage.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import ProfilePage from './pages/profile/ProfilePage.jsx';
import RootLayoutForNotSign from './layouts/RootLayoutForNotSign.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const queryClient = new QueryClient();

const  router = createBrowserRouter([
  {
    element:<AuthOutlet fallbackPath='/login'/>,
    children:[
      {
        path:"/",
        element:<RootLayout/>,
        errorElement:<NotFoundPage/>,
    children: [
      {
        path:"/",
      element: <App/>,
      },
      {
      path:"/create",
      element: <CreateTodoPage/>,
      },
      {
        path:"/profile",
        element: <ProfilePage/>
      },
    ]
  },
    ]
  },
  {
    element:<RootLayoutForNotSign/>,
    errorElement:<NotFoundPage/>,
    children:[
  {
    path:"/register",
    element:<RegisterPage/>
  },
  {
    path:"/login",
    element:<LoginPage/>,
  }
]},
{
  path:"*",
  element:<NotFoundPage/>
}
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
    </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
