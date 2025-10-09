import LocationCarousel from "@/components/LocationCarousel";
import { client } from "@/sanity/lib/client";

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;

  const locations = await client.fetch(`*[_type == 'location'] | order(_createdAt asc) {
    title,
    subtitle,
    "currentSlug": slug.current,
    image,
    description
  }`);

  return <LocationCarousel locations={locations} slug={slug} />;
}
