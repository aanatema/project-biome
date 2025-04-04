import { type SubmitHandler, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<UserProps> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
    >
      <label>
        USERNAME
        <input
          {...register("username", { required: "Incorrect username" })}
          type="text"
          placeholder="username"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>
      <label>
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
