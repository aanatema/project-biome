import { useForm, type SubmitHandler } from "react-hook-form";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ConfirmDeletionDialog } from "./userComponents/ConfirmDeletion";

export type UserProps = {
  username: string;
  email: string;
  password?: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onRegisterSubmit: SubmitHandler<UserProps> = async (data) => {
    const newUserData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await fetch("http://localhost:3000/users/new_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!response.ok)
      return console.error(
        "Server error for newUser, check documentation to resolve"
      );

    const json = await response.json();
    console.log(json);
  };
  return (
   <ConfirmDeletionDialog/>
  );
}
