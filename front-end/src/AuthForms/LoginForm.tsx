import { type SubmitHandler, useForm } from "react-hook-form";
import "./forms.css"

export type UserProps = {
  username: string;
  email: string;
  password?: string;
};

export function LoginForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {

    const existingUser = {
      username : data.username,
      email: data.email
    };
    
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingUser),
    });

    if(!response.ok) return console.error("server error for newUser"); 

    const json = await response.json()

    console.log(json);
  };

  return (
    <form
      className="auth-form login-form"
      onSubmit={handleSubmit(onSubmit)}
      method="GET"
    >
      <label className="auth-label login-label">
        USERNAME
        <input
          {...register("username", { required: "Incorrect username" })}
          type="text"
          placeholder="username"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>
      <label className="auth-label login-label">
        EMAIL
        <input
          {...register("email", { required: "Incorrect email" })}
          type="text"
          placeholder="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      {/* LATER */}
      {/* <label>
        PASSWORD
        <input
          {...register("password", { required: "Incorrect password" })}
          type="password"
          placeholder="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label> */}

      <button type="submit"> CONFIRM </button>
    </form>
  );
}
