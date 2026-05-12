import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .regex(/^[a-zA-Z0-9]+$/),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.",
    ),
});
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .regex(/^[a-zA-Z0-9]+$/),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const resetPasswordSchema = z
  .object({
    code: z.string().min(1, "Confirmation code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

export const addBankAccountSchema = z.object({
  bankName: z.string().min(1, "Bank Name is required"),
  bankBalance: z.coerce
    .number("Amount must be a number")
    .positive("Amount must be positive")
    .multipleOf(0.01, "Maximum two decimal places allowed"),

  bankDetails: z.string().min(1, "Bank Details is required"),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const addIncomeEntrySchema = z.object({
  amount: z.coerce
    .number("Amount must be a number")
    .positive("Amount must be positive")
    .multipleOf(0.01, "Maximum two decimal places allowed"),
  sourceOfIncome: z.string().min(1, "Source of Income is required"),
  incomeCategory: z.string().min(1, "A income category needs to be selected"),
  bankName: z.string().min(1, "A Bank needs to be selected"),
  amountChange: z.string().min(1, "Selection is required."),
});
