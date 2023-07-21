import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import authContext from "../lib/authContext";
import { logoutUser } from "../lib/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Header() {
  // logout functionality
  const authCtx = React.useContext(authContext);
  const nav = useNavigate();
  //const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      authCtx.logOutUser();
      toast.error(data.message, { theme: "light" });
      nav("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data.message);
    },
  });

  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const NavList = () => {
    const authCtx = React.useContext(authContext);
    const prof = authCtx.userLoggedIn;
    return !prof ? (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Link to={"/login"}>
          <Button
            variant="filled"
            className="flex gap-x-2 items-center"
            color="indigo"
            size="sm"
          >
            <UserIcon className="h-5 w-5" />
            <p className="text-xs normal-case">Sign In</p>
          </Button>
        </Link>

        <Link to={"/register"}>
          <Button
            variant="filled"
            size="sm"
            className="flex gap-x-2 items-center"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <p className="text-xs normal-case">Sign Up</p>
          </Button>
        </Link>
      </ul>
    ) : (
      <>
        <Menu>
          <MenuHandler>
            <Avatar
              size="sm"
              alt="avatar"
              src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
              className="ring-4 ring-green-500/30 border border-green-500 shadow-xl shadow-green-900/20"
            />
          </MenuHandler>
          <MenuList>
            <MenuItem>
              <Link to={"/profile"}>
                <Typography variant="small">Profile</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => mutation.mutate()}>
              <Typography variant="small">Logout</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
      // {JSON.parse(localStorage.getItem("userInfo"))["name"]}
    );
  };

  return (
    <Navbar
      className="w-full px-6 py-3 rounded-none"
      variant="gradient"
      color="light-blue"
      fullWidth={true}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          MernAuth Tutorial
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
