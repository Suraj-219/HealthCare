import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile to get personalized healthcare recommendations and services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Book Appointments",
    description:
      "Browse doctor profiles, check availability, and book appointments that fit your schedule.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Video Consultation",
    description:
      "Connect with doctors through secure, high-quality video consultations from the comfort of your home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Consultation Credits",
    description:
      "Purchase credit packages that fit your healthcare needs with our simple subscription model.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verified Doctors",
    description:
      "All healthcare providers are carefully vetted and verified to ensure quality care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Medical Documentation",
    description:
      "Access and manage your appointment history, doctor's notes, and medical recommendations.",
  },
];

// JSON data for testimonials
export const testimonials = [
  {
    initials: "EM",
    name: "Emily M.",
    role: "Patient",
    quote:
      "The video consultation feature has been a lifesaver for me. It's allowed me to receive medical guidance without the hassle of lengthy commutes or taking time off from work.",
  },
  {
    initials: "DW",
    name: "Dr. William D.",
    role: "Cardiologist",
    quote:
      "This platform has revolutionized the way I practice medicine. It allows me to connect with patients more efficiently and deliver timely care, free from the constraints of a traditional office setting.",
  },
  {
    initials: "RT",
    name: "Rachel T.",
    role: "Patient",
    quote:
      "The credit system has been a huge convenience for my family and me. We've been able to purchase a package that fits our needs, ensuring we can consult with specialists whenever we need to.",
  },
];

// JSON data for credit system benefits
export const creditBenefits = [
  "All consultations use <strong class='text-emerald-400'>1 credits</strong>, regardless of length",
  "Your <strong class='text-emerald-400'>credits are valid indefinitely</strong>, use them at your convenience",
  "With a monthly subscription, you'll receive <strong class='text-emerald-400'>new credits monthly</strong>",
  "You can <strong class='text-emerald-400'>modify or cancel</strong> your subscription at any time, penalty-free",
];