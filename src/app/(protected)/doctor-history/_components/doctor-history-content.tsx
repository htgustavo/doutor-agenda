"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getDoctorAppointments } from "@/actions/get-doctor-appointments";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctorsTable } from "@/db/schema";

import { doctorHistoryTableColumns } from "./table-columns";


interface DoctorHistoryContentProps {
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const DoctorHistoryContent = ({ doctors }: DoctorHistoryContentProps) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["doctor-appointments", selectedDoctorId],
    queryFn: async () => {
      const result = await getDoctorAppointments({ doctorId: selectedDoctorId });
      if (result?.serverError) {
        throw new Error(result.serverError);
      }
      return result?.data || [];
    },
    enabled: !!selectedDoctorId,
  });

  const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="doctor-select" className="text-sm font-medium">
          Selecione o médico
        </label>
        <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Selecione um médico" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedDoctorId && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">
              Histórico de Consultas - {selectedDoctor?.name}
            </h3>
            {isLoading && (
              <span className="text-sm text-muted-foreground">
                Carregando...
              </span>
            )}
          </div>
          
          {appointments && !isLoading && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {appointments.length} consulta(s) encontrada(s)
              </p>
              <DataTable 
                data={appointments} 
                columns={doctorHistoryTableColumns} 
              />
            </div>
          )}

          {appointments && appointments.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma consulta encontrada para este médico.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorHistoryContent; 