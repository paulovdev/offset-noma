"use client";

import { useRouter, useParams } from "next/navigation";
import { ProjectModal } from "@/components/home/modals/project-modal";
import { projects } from "@/components/home/project-data";

export default function ProjectModalRoute() {
  const router = useRouter();
  const { id } = useParams();

  const project = projects.find((project) => project.id === id);

  if (!project) return null;

  return (
    <ProjectModal project={project} onCompleteClose={() => router.back()} />
  );
}
