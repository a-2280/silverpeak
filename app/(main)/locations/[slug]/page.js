import LocationCarousel from "@/components/LocationCarousel";
import { client } from "@/sanity/lib/client";

export default async function LocationDetailPage() {
  const locations = await client.fetch(`*[_type == 'location'] {
    title,
    subtitle,
    image,
    description
  }`);

  return <LocationCarousel locations={locations} />;
}
