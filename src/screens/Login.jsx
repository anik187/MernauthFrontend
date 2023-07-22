import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUser } from "../lib/authApi.js";
import authContext from "../lib/authContext.js";
export default function Login() {
  const authCtx = useContext(authContext);
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      authCtx.logInUser(data);
      toast.success(`Welcome back ${data.name}!!`);
      nav("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data.message);
    },
  });
  const mailRef = useRef();
  const passRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const UserData = {
      email: mailRef.current.value,
      password: passRef.current.value,
    };
    mutation.mutate(UserData);
  };
  if (mutation.isLoading) {
    return (
      <div className="flex items-center justify-center pt-3 w-full">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center pt-3 w-full">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign In
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal normal-case text-center"
        >
          Enter your details to Login.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              inputRef={mailRef}
              required={true}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              inputRef={passRef}
              required={true}
            />
          </div>
          <Button className="mt-6 normal-case" fullWidth type="submit">
            Login
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal normal-case"
          >
            Already have an account?{" "}
            <Link
              to={"/register"}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
