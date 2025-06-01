import { useForm, type SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

// register:  This function is used to connect input fields to the form.
// handleSubmit:  is a function to handle form submission.
// formState:  This object holds metadata about the form’s state, such as: errors, isSubmitting, isValid etc.

const onSubmit: SubmitHandler<FormData> = (data) => {
  console.log(data);
};

const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="">Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="Password">Password:</label>
        <input
          {...register("password", {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default SimpleForm;
