import { z } from "zod";

// Interessante ter um shcema para cada formulario
export const signUpFormSchema = z
  .object({
    name: z.string().min(1, { message: "Campo obrigatório" }).max(255),
    // v3 z.string().email
    // v4 como está abaixo
    email: z.email({ message: "Email inválido" }).max(100),
    password: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
      .max(15),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // data e todo formulario preenchido
    message: "As senhas são diferentes",
    path: ["confirmPassword"],
    // onde quero mostrar o erro
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
// Criando um novo tipo do typescript utilizando o schema do signFormSchema
