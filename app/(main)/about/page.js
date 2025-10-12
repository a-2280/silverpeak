import Contact from "@/components/Contact";
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
    <div className="lg:flex lg:justify-start lg:items-center lg:h-screen lg:w-screen lg:px-[57px]">
      <div className="w-screen flex flex-col items-start px-[25px] mt-[78.42px] pb-[100px] lg:w-1/2 lg:px-0">
        <h1 className="mb-[59px] mt-[0px] hidden !text-[24px] lg:flex">
          {about.title}
        </h1>
        <h2 className="mb-[37px] mt-[25px] lg:hidden">{about.title}</h2>
        <div className="w-full mb-[25px] lg:max-w-[440px] lg:mb-[35px]">
          {about.team?.map((member, i) => (
            <div key={i}>
              <div className="grid grid-cols-3 gap-8 py-1">
                <p className="!alt-p lg:!text-[15px]">{member.name}</p>
                <p className="col-span-2 !alt-p lg:!text-[15px]">
                  {member.job}
                </p>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="lg:hidden">
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
        </div>
        <div className="mt-[50px] lg:mt-0">
          <p className="!alt-p lg:!text-[15px]">
            Interested in joining our team?
          </p>
          <p className="!alt-p lg:!text-[15px]">
            Contact us using the information below.
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-col max-w-[806px] justify-center lg:w-1/2">
        <PortableText
          value={about.main}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="!alt-p !text-[15px]">{children}</p>
              ),
            },
          }}
        />
        <div className="mt-[145px]">
          <p className="mb-[25px] !text-[13px]">some clients include:</p>
          <ul>
            {about.clients?.map((client, i) => (
              <li
                key={i}
                className="flex items-center gap-[4.64px] !text-[15px]"
              >
                <Image
                  src="/arrow.svg"
                  alt="arrow"
                  width={15}
                  height={15}
                  className="scale-x-[-1]"
                />
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
