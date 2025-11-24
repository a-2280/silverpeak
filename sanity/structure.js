import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Landing Page")
        .child(S.document().schemaType("landingPage").documentId("landingPage")),
      S.listItem()
        .title("About")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Projects & Services")
        .child(S.document().schemaType("projects").documentId("projects")),
      orderableDocumentListDeskItem({
        type: "location",
        title: "Locations",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (item) => !["about", "projects", "location", "landingPage"].includes(item.getId())
      ),
    ]);
