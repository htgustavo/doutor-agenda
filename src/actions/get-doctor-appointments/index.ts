"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/next-safe-action";

export const getDoctorAppointments = protectedWithClinicActionClient
  .schema(
    z.object({
      doctorId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const appointments = await db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.doctorId, parsedInput.doctorId),
        eq(appointmentsTable.clinicId, ctx.user.clinic.id)
      ),
      with: {
        patient: true,
        doctor: true,
      },
      orderBy: (appointments, { desc }) => [desc(appointments.date)],
    });

    return appointments;
  }); 