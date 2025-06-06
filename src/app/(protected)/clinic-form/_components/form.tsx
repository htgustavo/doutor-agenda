"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório"}),
})

const ClinicForm = () => {

  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  })

  const { execute, isExecuting } = useAction(createClinic, {
    onError: ({ error }) => {
      toast.error(error.serverError || 'Erro ao criar clínica.')
    }
  })

  async function onSubmit(values: z.infer<typeof clinicSchema>) {
    execute(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da clínica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isExecuting}
            >
              {isExecuting && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              Criar clínica
            </Button>
          </DialogFooter>

        </form>
      </Form>
    </>
  );
}
 
export default ClinicForm;