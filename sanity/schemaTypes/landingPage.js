export default {
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    {
      name: "carouselImages",
      title: "Carousel Images",
      type: "array",
      of: [{ type: "image" }],
      description: "Images that will rotate on the landing page carousel",
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Landing Page Carousel",
      };
    },
  },
  __experimental_singleton: true,
};
