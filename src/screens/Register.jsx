import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../lib/authApi";
import authContext from "../lib/authContext";
export default function Register() {
  const authCtx = useContext(authContext);
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      authCtx.logInUser(data);
      nav("/");
    },
  });
  const mailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const UserData = {
      name: nameRef.current.value,
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
          Sign Up
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal normal-case text-center"
        >
          Enter your details to Register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" inputRef={nameRef} required={true} />
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
          {/* <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal normal-case"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button className="mt-6 normal-case" fullWidth type="submit">
            Sign Up
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal normal-case"
          >
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              LogIn
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
