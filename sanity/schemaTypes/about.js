export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      placeholder: "Silverpeak Engineering",
    },
    {
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "job",
              title: "Job Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "job",
            },
          },
        },
      ],
    },
    {
      title: "Main Content",
      name: "main",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "clients",
      title: "Clients",
      type: "array",
      of: [{ type: "string" }],
      description: "Add location features",
      options: {
        layout: "tags",
      },
      initialValue: [
        "Structural Engineering",
        "Civil Engineering",
        "Architectural Design",
        "Site Planning",
        "Entitlement",
        "Surveying",
      ],
    },
  ],
  __experimental_singleton: true,
};
