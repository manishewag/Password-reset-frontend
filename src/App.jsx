import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // path : ''
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgetPassword/>},
      { path: "/resetpassword/:token", element: <ResetPassword/>},
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/updateprofile", element: <UpdateProfilePage /> }
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
