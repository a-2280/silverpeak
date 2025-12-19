import LocationGallery from "@/components/LocationGallery";
import { client } from "@/sanity/lib/client";

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;

  const locations = await client.fetch(`*[_type == 'location'] {
    title,
    subtitle,
    "currentSlug": slug.current,
    image,
    description,
    attributes,
    gallery[],
    construction,
    squareFootage
  }`);

  const currentLocation = locations.find((loc) => loc.currentSlug === slug);

  return <LocationGallery currentLocation={currentLocation} />;
}
