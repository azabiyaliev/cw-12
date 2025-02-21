import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import {IUser} from "../../types";
import * as React from "react";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {unsetUser} from "../../features/users/usersSlice.ts";
import {logout} from "../../features/users/usersThunk.ts";
import {apiUrl} from "../../globalConstants.ts";

interface Props {
    user: IUser
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(unsetUser());
    }

    return (
        <>
            <Button
                onClick={handleClick}
                color={"inherit"}
            >
                Hello, {user.displayName}!
                <Avatar alt={user.displayName} src={user.avatar && user.avatar.startsWith("images/") || user.avatar.startsWith("fixtures/") ? apiUrl + "/" + user.avatar : user.avatar} sx={{ml: 2}} />

            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>

    );
};

export default UserMenu;