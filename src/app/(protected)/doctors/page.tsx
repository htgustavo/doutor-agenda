import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

const DoctorsPage = () => {
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