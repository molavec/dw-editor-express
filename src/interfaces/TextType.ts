import type { Delta } from "@vueup/vue-quill";

export default interface TextType {
  id?: string | undefined;
  title: Delta | undefined;
  content: Delta | undefined;
  authorId?: string | undefined;
  isPublished?: boolean | undefined;
}
