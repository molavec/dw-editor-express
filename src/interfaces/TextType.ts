import type { Delta } from "@vueup/vue-quill";

export default interface TextType {
  id?: string | undefined;
  title: string | Delta | undefined;
  content: string | Delta | undefined;
  authorId?: string | undefined;
  isPublished?: boolean | undefined;
}
