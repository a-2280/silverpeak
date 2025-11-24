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
      name: "defaultImage",
      title: "Default Image",
      type: "image",
      description: "Image shown on the right when not hovering over any location",
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
