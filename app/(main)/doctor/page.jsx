import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getDoctorAppointments, getDoctorAvailability } from "@/actions/doctor";
import { AvailabilitySettings } from "./_components/availability-settings";
import { redirect } from "next/navigation";
import { Calendar, Clock, DollarSign } from "lucide-react";
import DoctorAppointmentsList from "./_components/appointments-list";
import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
import { DoctorEarnings } from "./_components/doctor-earnings";
import { getCurrentUser } from "@/actions/onbording";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function DoctorDashboardPage() {
  const user = await getCurrentUser();

  // Redirect if not a doctor
  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If not verified, redirect to verification page
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  let error = null;
  let appointmentsData = { appointments: [] };
  let availabilityData = { slots: [] };
  let earningsData = { earnings: {} };
  let payoutsData = { payouts: [] };

  try {
    // Fetch all data in parallel
    [appointmentsData, availabilityData, earningsData, payoutsData] =
      await Promise.all([
        getDoctorAppointments().catch(err => {
          console.error("Error fetching appointments:", err);
          return { appointments: [] };
        }),
        getDoctorAvailability().catch(err => {
          console.error("Error fetching availability:", err);
          return { slots: [] };
        }),
        getDoctorEarnings().catch(err => {
          console.error("Error fetching earnings:", err);
          return { earnings: {} };
        }),
        getDoctorPayouts().catch(err => {
          console.error("Error fetching payouts:", err);
          return { payouts: [] };
        }),
      ]);
  } catch (err) {
    console.error("Error in doctor dashboard:", err);
    error = err.message;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="appointments" className="w-full">
        <TabsList>
          <TabsTrigger value="appointments">
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Clock className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <DollarSign className="h-4 w-4 mr-2" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="border-none p-0">
          <DoctorAppointmentsList 
            appointments={appointmentsData.appointments} 
            doctor={appointmentsData.doctor}
          />
        </TabsContent>

        <TabsContent value="availability" className="border-none p-0">
          <AvailabilitySettings slots={availabilityData.slots} />
        </TabsContent>

        <TabsContent value="earnings" className="border-none p-0">
          <DoctorEarnings 
            earnings={earningsData.earnings} 
            payouts={payoutsData.payouts} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}