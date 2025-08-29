"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { signUpFormSchema, SignUpFormSchema } from "../_schemas/auth-schema";
import z from "zod";

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErros] = useState<z.ZodError<SignUpFormSchema>>();

  const formErrors = errors ? z.treeifyError(errors)?.properties : null;

  console.log(formErrors);
  // Funçao do zod que ajuda a mostrar os erros na tela
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    // FormData do Javascript para pegar a referencia atual do FORM
    // formRef.current! - ! estou garantindo ao tscript que o current nunca sera null
    const data = Object.fromEntries(formData);
    // Pagando os dados do formulario, convertendo para um objeto.

    console.log("Formulario final, onde chamo a API -> ", data);

    const parsedData = signUpFormSchema.safeParse(data);
    // safeParse() nao quebra a aplicaçao se os dados falharem e parse() quebra
    // parsedData pode ser data, success ou error
    if (!parsedData.success) {
      // console.log(parsedData.error);
      setErros(parsedData.error);
      return;
    }
    setErros(undefined);
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      // Preciso colocar a referencia do formulario (react) para nao ser null
      className="space-y-4 w-96 mx-auto mt-10"
    >
      <div>
        <Input name="name" placeholder="Nome" />
        {formErrors?.name && (
          <div className="text-red-500 text-xs">
            {formErrors?.name.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input name="email" placeholder="Email" type="email" />
        {formErrors?.email && (
          <div className="text-red-500 text-xs">
            {formErrors?.email.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input name="password" placeholder="Senha" type="password" />
        {formErrors?.password && (
          <div className="text-red-500 text-xs">
            {formErrors?.password?.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input
          name="confirmPassword"
          placeholder="Confirmar Senha"
          type="password"
        />
        {formErrors?.confirmPassword && (
          <div className="text-red-500 text-xs">
            {formErrors?.confirmPassword?.errors[0]}
          </div>
        )}
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
}
