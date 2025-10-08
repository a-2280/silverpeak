import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

async function getData() {
  const query = `
    *[_type == 'location'] | order(_createdAt asc) {
  title,
    subtitle,
    "currentSlug": slug.current,
    image,
    attributes
}
    `;

  const data = await client.fetch(query);

  return data;
}

export default async function Locations() {
  const data = await getData();

  return (
    <div className="h-max flex flex-col justify-center">
      {data.map((location, index) => (
        <section
          key={index}
          className="h-screen flex flex-col justify-center snap-center"
        >
          <h2 className="mb-[11px]">
            [{index + 1}] {location.title}
          </h2>
          <p className="mb-[23px]">{location.subtitle}</p>
          {location.image && (
            <Image
              src={urlFor(location.image).url()}
              alt={location.title}
              width={387}
              height={412}
              priority
              className="w-full h-auto max-h-[300px] min-h-[300px] max-[390px]:max-h-[200px] max-[390px]:min-h-[200px] object-cover mb-[20px]"
            />
          )}
          <div className="flex justify-between items-start">
            <ul>
              {location.attributes?.map((attr, i) => (
                <li key={i} className="flex items-center gap-[4.64px]">
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    width={11}
                    height={11}
                    className="scale-x-[-1]"
                  />
                  {attr}
                </li>
              ))}
            </ul>
            <Link href={`/locations/${location.currentSlug}`}>read more</Link>
          </div>
        </section>
      ))}
    </div>
  );
}
