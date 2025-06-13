import { getDoctorById, getAvailableTimeSlots } from "@/actions/appointments";
import { DoctorProfile } from "./_components/doctor-profile";
import { notFound } from "next/navigation";

export default async function DoctorProfilePage({ params }) {
  const { id } = params;

  // First fetch doctor data
  const doctorData = await getDoctorById(id);
  
  if (!doctorData?.doctor) {
    notFound();
  }

  try {
    // Then fetch available slots
    const slotsData = await getAvailableTimeSlots(id);

    return (
      <DoctorProfile
        doctor={doctorData.doctor}
        availableDays={slotsData.days || []}
      />
    );
  } catch (error) {
    // If the error is about no availability, show the profile with empty slots
    if (error.message === "No availability set by doctor") {
      return (
        <DoctorProfile
          doctor={doctorData.doctor}
          availableDays={[]}
        />
      );
    }
    // For other errors, show not found
    console.error("Error loading doctor profile:", error);
    notFound();
  }
}