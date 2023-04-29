interface TextType {
  id?: string | undefined;
  title: string | undefined;
  content: string | undefined;
  authorId?: string | undefined;
  isPublished?: boolean | undefined;
}

export default TextType;