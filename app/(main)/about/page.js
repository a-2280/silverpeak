import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import Image from "next/image";

export default async function about() {
  const about = await client.fetch(`
 *[_type == 'about'][0] {
  title,
  team,
  main,
  clients
}
`);

  return (
    <div className="w-screen flex flex-col items-start px-[25px] mt-[78.42px] mb-[78px]">
      <h2 className="mb-[37px] mt-[25px]">{about.title}</h2>
      <div className="w-full mb-[25px]">
        {about.team?.map((member, i) => (
          <div key={i}>
            <div className="grid grid-cols-3 gap-8 py-1">
              <p className="!alt-p">{member.name}</p>
              <p className="col-span-2 !alt-p">{member.job}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <PortableText
        value={about.main}
        components={{
          block: {
            normal: ({ children }) => <p className="!alt-p ">{children}</p>,
          },
        }}
      />
      <div className="mt-[50px]">
        <p className="mb-4">some clients include:</p>
        <ul>
          {about.clients?.map((client, i) => (
            <li key={i} className="flex items-center gap-[4.64px]">
              <Image
                src="/arrow.svg"
                alt="arrow"
                width={11}
                height={11}
                className="scale-x-[-1]"
              />
              {client}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-[50px]">
        <p className="!alt-p">Interested in joining our team?</p>
        <p className="!alt-p">Contact us using the information below.</p>
      </div>
    </div>
  );
}
