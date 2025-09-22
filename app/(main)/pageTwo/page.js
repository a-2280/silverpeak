import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

async function getData() {
  const query = `
    *[_type == 'location'] | order(_createdAt desc) {
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

export default async function pageTwo() {
  const data = await getData();

  return (
    <div>
      {data.map((location, index) => (
        <div key={index}>
          <h2 className="mt-[33px] mb-[11px]">
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
              className="w-full h-auto max-h-[412px] object-cover mb-[20px]"
            />
          )}
          <div className="flex justify-between items-start mb-[33px]">
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
            <Link href={`/pageTwo/${location.currentSlug}`}>read more</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
