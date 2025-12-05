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
    <div className="lg:flex lg:justify-start lg:items-start lg:h-[100dvh] lg:w-screen lg:px-[25px] lg:pt-[176px]">
      <div className="lg:flex lg:justify-start lg:items-stretch lg:w-full lg:h-min">
        <div className="w-screen flex flex-col items-start px-[25px] mt-[78.42px] pb-[100px] lg:w-1/2 lg:px-0 lg:m-0 lg:p-0 lg:relative">
          <h1 className="mb-[25px] mt-[0px] hidden !text-[24px] lg:flex">
            {about.title}
          </h1>
          <h2 className="mb-[37px] mt-[25px] lg:hidden">{about.title}</h2>
          <div className="w-full mb-[25px] lg:max-w-fit lg:mb-0">
            {about.team?.map((member, i) => (
              <div key={i}>
                <div className="grid grid-cols-3 py-1">
                  <p className="!alt-p lg:!text-[15px]">{member.name}</p>
                  <p className="col-span-2 !alt-p lg:!text-[15px] ml-9">
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
                  normal: ({ children }) => (
                    <p className="!alt-p !leading-[16px]">{children}</p>
                  ),
                },
              }}
            />
            <div className="mt-[50px]">
              <p className="mb-4">some clients include:</p>
              <ul>
                {about.clients?.map((client, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-[4.64px] !leading-[16px]"
                  >
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
          <div className="mt-[50px] lg:mt-0 lg:absolute lg:bottom-[-65px]">
            <p className="!alt-p lg:!text-[15px]">
              Interested in joining our team?
            </p>
            <p className="!alt-p lg:!text-[15px]">
              Contact us using the information below.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex flex-col max-w-[806px] justify-center lg:w-1/2 lg:justify-between lg:gap-[64px]">
          <PortableText
            value={about.main}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="!alt-p !text-[15px] lg:h-full lg:overflow-scroll lg:max-h-[225px] lg:no-scrollbar">
                    {children}
                  </p>
                ),
              },
            }}
          />
          <div>
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
    </div>
  );
}
