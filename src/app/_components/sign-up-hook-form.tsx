"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignUpFormSchema, signUpFormSchema } from "../_schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpHookForm() {
  const {
    register,
    // Principal propriedade
    handleSubmit,
    // Executa tudo que precisa antes de submeter a sua funçao de fato
    formState: { errors },
    // Capturar erros
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    // resolve o schema do zop. Poderia ser yup
  });

  function onSubmit(payload: SignUpFormSchema) {
    // Recebe os valore do formulario ja validado
    console.log("submit", payload);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-96 mx-auto mt-10"
    >
      <div>
        <Input placeholder="Nome" {...register("name")} />
        {errors?.name && (
          <div className="text-red-500 text-xs">{errors?.name?.message}</div>
        )}
      </div>
      <div>
        <Input placeholder="Email" type="email" {...register("email")} />
        {errors?.email && (
          <div className="text-red-500 text-xs">{errors?.email?.message}</div>
        )}
      </div>
      <div>
        <Input placeholder="Senha" type="password" {...register("password")} />
        {errors?.password && (
          <div className="text-red-500 text-xs">
            {errors?.password?.message}
          </div>
        )}
      </div>
      <div>
        <Input
          placeholder="Confirmar Senha"
          type="password"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <div className="text-red-500 text-xs">
            {errors?.confirmPassword?.message}
          </div>
        )}
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
}
