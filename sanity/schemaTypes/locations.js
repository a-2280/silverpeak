export default {
  name: "location",
  type: "document",
  title: "Location",
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  fields: [
    {
      name: "orderRank",
      type: "string",
      title: "Order Rank",
      hidden: true,
    },
    {
      name: "title",
      type: "string",
      title: "Title",
      placeholder: "Freedom Preparatory Academy",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Location",
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
      name: "construction",
      type: "string",
      title: "Construction Type",
      placeholder: "CMU & Steel",
    },
    {
      name: "squareFootage",
      type: "string",
      title: "Square Footage",
      placeholder: "55,000",
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
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Image",
            },
            {
              name: "pairWithNext",
              type: "boolean",
              title: "Pair with next image",
              description: "Display this image side-by-side with the next one (9px gap)",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              media: "image",
              pairWithNext: "pairWithNext",
            },
            prepare({ media, pairWithNext }) {
              return {
                title: pairWithNext ? "Image (paired with next)" : "Image",
                media,
              };
            },
          },
        },
      ],
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
