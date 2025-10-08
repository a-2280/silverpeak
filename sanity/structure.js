// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Projects & Services")
        .child(S.document().schemaType("projects").documentId("projects")),
      ...S.documentTypeListItems().filter(
        (item) => !["about", "projects"].includes(item.getId())
      ),
    ]);
