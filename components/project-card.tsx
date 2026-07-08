"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Lock } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/context/language-context"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubLink: string
  demoLink: string
  image?: string
  embedCode?: string
  isConfidential?: boolean
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  image,
  embedCode,
  isConfidential,
}: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all duration-300">
      <div className="relative overflow-hidden h-48">
        {embedCode ? (
          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: embedCode }} />
        ) : (
          <>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          </>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-cyan-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="bg-gray-800 text-cyan-400 border-cyan-400/20">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {isConfidential ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-cyan-500/20 hover:bg-cyan-950/50 hover:text-cyan-400"
              >
                <Lock className="w-4 h-4 mr-2" />
                {t("projects.confidential")}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-cyan-400">{t("projects.confidential.title")}</DialogTitle>
                <DialogDescription className="text-gray-300">
                  {t("projects.confidential.description")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end">
                <Button asChild variant="default" className="bg-cyan-600 hover:bg-cyan-700">
                  <Link href={demoLink}>
                    <Linkedin className="w-4 h-4 mr-2" />
                    {t("projects.confidential.button")}
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 border-cyan-500/20 hover:bg-cyan-950/50 hover:text-cyan-400"
          >
            <Link href={githubLink}>
              <Github className="w-4 h-4 mr-2" />
              {t("projects.button.code")}
            </Link>
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 border-cyan-500/20 hover:bg-cyan-950/50 hover:text-cyan-400"
        >
          <Link href={demoLink}>
            <Linkedin className="w-4 h-4 mr-2" />
            {t("projects.button.linkedin")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
