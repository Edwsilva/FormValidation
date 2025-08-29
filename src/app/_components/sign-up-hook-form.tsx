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
      // Executa se tudo estiver validado no formulario
      className="space-y-4 w-96 mx-auto mt-10"
    >
      <div>
        {/* <Input name="name" placeholder="Nome" /> ANTES DO useForm() - sempre por ultimo e igual ao nome do campo*/}
        <Input placeholder="Nome" {...register("name")} />
      </div>
      <div>
        <Input placeholder="Email" type="email" {...register("email")} />
      </div>
      <div>
        <Input placeholder="Senha" type="password" {...register("password")} />
      </div>
      <div>
        <Input
          placeholder="Confirmar Senha"
          type="password"
          {...register("confirmPassword")}
        />
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
}
