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
      title: "Main Image",
    },
    {
      name: "gallery",
      type: "array",
      title: "Gallery",
      of: [{ type: "image" }],
      description: "Add multiple images for the gallery",
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
      initialValue: [
        "Structural Engineering",
        "Civil Engineering",
        "Architectural Design",
        "Site Planning",
        "Entitlement",
        "Surveying",
      ],
    },
    {
      title: "Description",
      name: "description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
