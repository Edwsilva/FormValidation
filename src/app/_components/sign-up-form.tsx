"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    // FormData do Javascript para pegar a referencia atual do FORM
    // formRef.current! - ! estou garantindo ao tscript que o current nunca sera null
    const data = Object.fromEntries(formData);
    // Pagando os dados do formulario, convertendo para um objeto.

    console.log("Formulario final -> ", data);
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
      </div>
      <div>
        <Input name="email" placeholder="Email" type="email" />
        {/* {formErrors?.email && (
          <div className="text-red-500 text-xs">
            {formErrors?.email.errors[0]}
          </div>
        )} */}
      </div>
      <div>
        <Input name="password" placeholder="Senha" type="password" />
      </div>
      <div>
        <Input
          name="confirmPassword"
          placeholder="Confirmar Senha"
          type="password"
        />
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
}
