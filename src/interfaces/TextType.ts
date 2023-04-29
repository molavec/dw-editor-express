import type { Delta } from '@vueup/vue-quill';

interface TextType {
  id?: string | undefined;
  title: Delta | undefined;
  content: Delta | undefined;
  authorId?: string | undefined;
  isPublished?: boolean | undefined;
}

export default TextType;