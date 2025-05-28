import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

const DoctorsPage = async () => {
  
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user) {
    redirect('/authentication')
  }

  if(!session?.user.clinic) {
    redirect('/clinit-form')
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerencia os médicos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>Adicionar</Button>
        </PageActions>
      </PageHeader>
      <PageContent>

        dasdasdasdas
      </PageContent>
    </PageContainer>
  );
}
 
export default DoctorsPage;