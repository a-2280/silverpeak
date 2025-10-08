import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import Link from "next/link";

export default async function projects() {
  const projects = await client.fetch(`
 *[_type == 'projects'][0] {
  title,
  work,
  main,
}
`);

  return (
    <div className="w-screen flex flex-col items-start px-[25px] mt-[78.42px] mb-[78px]">
      <h2 className="mb-[37px] mt-[25px]">{projects.title}</h2>
      <div className="w-full mb-[25px]">
        {projects.work?.map((job, i) => (
          <div key={i}>
            <div className="flex justify-between items-center py-1">
              <p className="!alt-p">{job.name}</p>
              <Link href={job.url ?? "#"}>link</Link>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <PortableText
        value={projects.main}
        components={{
          block: {
            normal: ({ children }) => <p className="!alt-p ">{children}</p>,
          },
        }}
      />
    </div>
  );
}
