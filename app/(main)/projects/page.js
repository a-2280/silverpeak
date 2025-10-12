import { client } from "@/sanity/lib/client";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await client.fetch(`
    *[_type == 'projects'][0] {
      title,
      main,
    }
  `);

  const locations = await client.fetch(`
    *[_type == 'location'] | order(_createdAt asc) {
      title,
      "currentSlug": slug.current,
      image,
    }
  `);

  return <ProjectsClient projects={projects} locations={locations} />;
}
