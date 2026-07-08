"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface CertificationCardProps {
  title: string
  organization: string
  date: string
  logo: string
  skills: string[]
  isCertificateImage?: boolean
}

export default function CertificationCard({
  title,
  organization,
  date,
  logo,
  skills,
  isCertificateImage = false,
}: CertificationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        {isCertificateImage ? (
          <div className="mb-4">
            <div className="rounded-md overflow-hidden bg-gray-800 border border-gray-700">
              <img
                src={logo || "/placeholder.svg"}
                alt={`${title} Certificate`}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
              <img src={logo || "/placeholder.svg"} alt={organization} className="w-full h-full object-contain" />
            </div>
            <div>
              <CardTitle className="text-lg text-green-400">{title}</CardTitle>
              <CardDescription className="text-gray-400">{organization}</CardDescription>
            </div>
          </div>
        )}

        {isCertificateImage && (
          <div className="mt-2">
            <CardTitle className="text-lg text-green-400">{title}</CardTitle>
            <CardDescription className="text-gray-400">{organization}</CardDescription>
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Issued: {date}</span>
        </div>
        <div className={`transition-all duration-500 ${isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pt-2 border-t border-gray-800">
            <p className="text-sm font-medium mb-2 text-gray-300">Skills</p>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-gray-800 text-green-400 border-green-400/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
