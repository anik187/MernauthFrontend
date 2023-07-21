import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
function Hero() {
  const body =
    "This is a boilerplate for MERN authentication that stores a JWT in an HTTP-only cookie. It also uses material-tailwind and react-query library";
  const title = "MERN Authentication";
  return (
    <Card className="mt-6 w-1/3 flex flex-col items-center">
      <CardBody className="flex flex-col items-center">
        <Typography
          variant="h5"
          textGradient={true}
          color="blue"
          className="mb-2"
        >
          {title}
        </Typography>
        <Typography>{body}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-x-2">
        <Link to={"/login"}>
          <Button className="normal-case">Sign In</Button>
        </Link>
        <Link to={"/register"}>
          <Button className="normal-case">Sign Up</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Hero;
