import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  name?: string;
  password1: string;
  password2: string;
}

export default function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Passwords not same" },
        { shouldFocus: true }
      );
    }
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 5,
              message: "Too short",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver email allowed.",
            },
          })}
          placeholder="email"
        />
        <span>{errors.email?.message}</span>
        <input {...register("name")} placeholder="name" />
        <input
          {...register("password1", { required: "Write this" })}
          placeholder="password1"
        />
        <span>{errors.password1?.message}</span>
        <input
          {...register("password2", { required: "Write this" })}
          placeholder="password2"
        />
        <span>{errors.password2?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
