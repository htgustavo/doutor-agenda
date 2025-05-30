

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { DatePicker } from "./_components/date-picker";


const DashboardPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user) {
    redirect('/authentication')
  }

  if(!session?.user.clinic) {
    redirect('/clinic-form')
  }

  return ( 
    <PageContainer>
    <PageHeader>
      <PageHeaderContent>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>
          Gerencia os pacientes da sua clínica
        </PageDescription>
      </PageHeaderContent>
      <PageActions>
        <DatePicker />
      </PageActions>
    </PageHeader>
    <PageContent>
      <div>
        <h1>Dashboard</h1>
      </div>
    </PageContent>
  </PageContainer>
  );
}
 
export default DashboardPage;