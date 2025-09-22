export default {
  name: "location",
  type: "document",
  title: "Location",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      placeholder: "Freedom Preparatory Academy",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Year and Location",
      placeholder: "2021, St. George, ut",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "attributes",
      title: "Attributes",
      type: "array",
      of: [{ type: "string" }],
      description: "Add location features",
      options: {
        layout: "tags",
      },
    },
  ],
};
