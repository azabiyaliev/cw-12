import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";


const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to='/register' color="inherit">
                Sing Up
            </Button>
            <Button component={NavLink} to='/login' color="inherit">
                Sing In
            </Button>
        </>
    );
};

export default AnonymousMenu;