import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              to="/"
              component={NavLink}
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                textTransform: "uppercase",
              }}
            >
              Pictures Gallery
            </Typography>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
