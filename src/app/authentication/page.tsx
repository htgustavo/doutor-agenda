import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user) {
    redirect('/dashboard')
  }

  return ( 
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <Image src="/logo.svg" alt="logo" width={200} height={100} />
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SignInForm />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    
    </div>
  );
}
 
export default AuthenticationPage;