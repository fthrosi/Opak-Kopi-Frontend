import { type InputFormProps } from "../components/molecules/inputForm";

interface FormItem {
  id: number;
  children: string;
  inputId: string;
  placeHolder: string;
  variant: InputFormProps["inputVariant"];
}

export const loginForm: FormItem[] = [
    {
        id: 1,
        children: "Email",
        inputId: "email",
        placeHolder:"exp:your-email@example.com",
        variant:"email"
    },
    {
        id: 2,
        children: "Password",
        inputId: "password",
        placeHolder:"exp:your-password",
        variant:"password"
    }
]

export const registerForm: FormItem[] = [
    {
        id: 1,
        children: "Nama",
        inputId: "fullName",
        placeHolder:"exp:your-full-name",
        variant:"text"
    },
    {
        id: 2,
        children: "Email",
        inputId: "email",
        placeHolder:"exp:your-email@example.com",
        variant:"email"
    },
    {
        id: 3,
        children: "Password",
        inputId: "password",
        placeHolder:"exp:your-password",
        variant:"password"
    }
]