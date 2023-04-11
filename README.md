# DW Editor Express

Implementación que permite testear el editor exclusivamente comunicando datos a un servidor express.

## how to 

Ejecutar el cliente web

```bash
yarn dev
```

Ejecutar el servidor express

```bash
cd server
yarn dev
```

Como se prueba una función específica simplemente se crea la interfaz del objeto texto:

```typescript
import type { Delta } from "@vueup/vue-quill";
export default interface TextType {
  id?: string | undefined;
  title: Delta | undefined;
  content: Delta | undefined;
  authorId?: string | undefined;
  isPublished?: boolean | undefined;
}
```