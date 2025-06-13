"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, AlertCircle } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DoctorAppointmentsList({ initialAppointments, initialDoctor }) {
  const {
    loading,
    data,
    error,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    if (!initialAppointments) {
      fetchAppointments();
    }
  }, []);

  // Use initial data if available, otherwise use fetched data
  const appointments = initialAppointments || data?.appointments || [];
  const doctor = initialDoctor || data?.doctor;

  return (
    <Card className="border-emerald-900/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
          Upcoming Appointments
          {doctor && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              Dr. {doctor.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading appointments...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="DOCTOR"
                refetchAppointments={fetchAppointments}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-xl font-medium text-white mb-2">
              No upcoming appointments
            </h3>
            <p className="text-muted-foreground">
              You don&apos;t have any scheduled appointments yet. Make sure
              you&apos;ve set your availability to allow patients to book.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}