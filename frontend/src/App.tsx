import NavBar from "./components/NavBar/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/containers/RegisterPage.tsx";
import LoginPage from "./features/users/containers/LoginPage.tsx";
import { Typography } from "@mui/material";
import Pictures from "./features/pictures/containers/Pictures.tsx";
import MyPictures from "./features/pictures/containers/MyPictures.tsx";
import NewPicture from "./features/pictures/containers/NewPicture.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/usersSlice.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/*"
          element={
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Not found{" "}
            </Typography>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Pictures />} />
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/users/:idUser" element={<MyPictures />} />
        <Route
          path="/addNewPicture"
          element={
            <ProtectedRoute
              isAllowed={
                user && (user.role === "admin" || user.role === "user")
              }
            >
              <NewPicture />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
