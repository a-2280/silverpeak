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
