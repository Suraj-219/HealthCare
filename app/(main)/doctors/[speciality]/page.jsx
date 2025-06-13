import { redirect } from "next/navigation";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import { PageHeader } from "@/components/page-header";
import { DoctorCard } from "@/components/doctor-card";

export default async function DoctorSpecialtyPage({ params }) {
  const { speciality } = params;

  // Redirect to main doctors page if no specialty is provided
  if (!speciality) {
    redirect("/doctors");
  }

  // Fetch doctors by specialty
  const { doctors, error } = await getDoctorsBySpecialty(speciality);

  if (error) {
    console.error("Error fetching doctors:", error);
  }

  // Decode the specialty for display
  const decodedSpecialty = decodeURIComponent(speciality);

  return (
    <div className="space-y-5">
      <PageHeader
        title={decodedSpecialty}
        backLink="/doctors"
        backLabel="All Specialties"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-white mb-2">
            No doctors available
          </h3>
          <p className="text-muted-foreground">
            We apologize, but there are no verified doctors in this specialty at this time. We encourage you to explore other specialties or revisit this page in the future.
          </p>
        </div>
      )}
    </div>
  );
}