export default {
  name: "projects",
  title: "Projects & Services",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      placeholder: "Projects & Services",
    },
    {
      name: "work",
      title: "Your Projects and Services",
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
              name: "url",
              title: "Url",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "link",
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
  ],
  __experimental_singleton: true,
};
