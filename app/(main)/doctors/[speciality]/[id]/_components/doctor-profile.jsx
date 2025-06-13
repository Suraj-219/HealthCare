"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Calendar,
  Clock,
  Medal,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SlotPicker } from "./slot-picker";
import { AppointmentForm } from "./appointment-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DoctorProfile({ doctor, availableDays }) {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();

  // Calculate total available slots
  const totalSlots = availableDays?.reduce(
    (total, day) => total + day.slots.length,
    0
  );

  const toggleBooking = () => {
    setShowBooking(!showBooking);
    if (!showBooking) {
      // Scroll to booking section when expanding
      setTimeout(() => {
        document.getElementById("booking-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingComplete = () => {
    router.push("/appointments");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Doctor Info */}
        <div className="md:col-span-1">
          <Card className="border-emerald-900/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={doctor.imageUrl || "/placeholder-doctor.png"}
                    alt={doctor.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Dr. {doctor.name}
                </h2>
                <p className="text-muted-foreground mb-4">{doctor.specialty}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-emerald-900/20">
                    <Medal className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <Button
                  onClick={toggleBooking}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
                >
                  {showBooking ? (
                    <>
                      Hide Booking
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Doctor Details and Booking Section */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                About Dr. {doctor.name}
              </CardTitle>
              <CardDescription>
                Professional background and expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-white font-medium">Description</h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {doctor.description}
                </p>
              </div>

              <Separator className="bg-emerald-900/20" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-white font-medium">Availability</h3>
                </div>
                {totalSlots > 0 ? (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                    <p className="text-muted-foreground">
                      {totalSlots} time slots available for booking over the next
                      4 days
                    </p>
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This doctor hasn't set their availability yet. Please check back later or contact the doctor directly.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Booking Section - Conditionally rendered */}
          {showBooking && (
            <div id="booking-section">
              <Card className="border-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">
                    Book an Appointment
                  </CardTitle>
                  <CardDescription>
                    Select a time slot and provide details for your consultation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {totalSlots > 0 ? (
                    <>
                      {/* Slot selection step */}
                      {!selectedSlot && (
                        <SlotPicker
                          days={availableDays}
                          onSelectSlot={handleSlotSelect}
                        />
                      )}

                      {/* Appointment form step */}
                      {selectedSlot && (
                        <AppointmentForm
                          doctorId={doctor.id}
                          slot={selectedSlot}
                          onBack={() => setSelectedSlot(null)}
                          onComplete={handleBookingComplete}
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <h3 className="text-xl font-medium text-white mb-2">
                        No available slots
                      </h3>
                      <p className="text-muted-foreground">
                        This doctor doesn't have any available appointment
                        slots for the next 4 days. Please check back later or try
                        another doctor.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}