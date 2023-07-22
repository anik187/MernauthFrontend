import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../lib/authApi.js";
import authContext from "../lib/authContext.js";
import { toast } from "react-toastify";
export default function Profilescreen() {
  const authCtx = useContext(authContext);
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      authCtx.logOutUser();
      toast.success("updated successfully");
      nav("/");
    },
    onError: (error) => {
      toast.error("something went wrong!!");
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
          Update Profile
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal normal-case text-center"
        >
          Enter your details to Update your Profile.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" inputRef={nameRef} />
            <Input type="email" size="lg" label="Email" inputRef={mailRef} />
            <Input
              type="password"
              size="lg"
              label="Password"
              inputRef={passRef}
            />
          </div>
          <Button className="mt-6 normal-case" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}
