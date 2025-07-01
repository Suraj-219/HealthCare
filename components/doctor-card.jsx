import React from 'react'
import { Card, CardContent } from './ui/card'
import { User, Stethoscope, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export const DoctorCard = ({ doctor }) => {
  return (
    <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all relative">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className='w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0'>
            {doctor.imageUrl ? (
              <img 
                src={doctor.imageUrl}
                alt={doctor.name}
                className='w-12 h-12 rounded-full object-cover'
              />
            ) : (
              <User className='h-6 w-6 text-emerald-400' />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Stethoscope className="h-4 w-4" />
              <span>{doctor.specialty}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {doctor.description || "No description available"}
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-[#fda4af] to-[#fef2f2] hover:from-[#fef2f2] hover:to-[#fda4af]"
            >
              <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
                Book Appointment
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
