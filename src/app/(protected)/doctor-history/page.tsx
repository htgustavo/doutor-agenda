import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import {
    PageContainer,
    PageContent,
    PageDescription,
    PageHeader,
    PageHeaderContent,
    PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { WithAuthentication } from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import DoctorHistoryContent from "./_components/doctor-history-content";

const DoctorHistoryPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session!.user.clinic!.id),
  });

  return (
    <WithAuthentication mustHaveClinic mustHavePlan>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Histórico de Médicos</PageTitle>
            <PageDescription>
              Visualize o histórico de consultas de cada médico
            </PageDescription>
          </PageHeaderContent>
        </PageHeader>
        <PageContent>
          <DoctorHistoryContent doctors={doctors} />
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
};

export default DoctorHistoryPage; 