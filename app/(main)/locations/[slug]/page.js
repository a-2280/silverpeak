import { client } from "@/sanity/lib/client";
import LocationCarousel from "@/components/LocationCarousel";

export const revalidate = 3600;

async function getData() {
  const query = `
    *[_type == 'location'] | order(_createdAt asc) {
  title,
    subtitle,
    "currentSlug": slug.current,
    image,
    attributes,
    description,
    }
    `;

  const data = await client.fetch(query);

  return data;
}

export default async function LocationDetailPage({ params }) {
  const data = await getData();
  const slug = params.slug;

  return <LocationCarousel locations={data} initialSlug={slug} />;
}
