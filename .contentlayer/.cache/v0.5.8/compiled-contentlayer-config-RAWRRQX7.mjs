// lib/content.ts
function calculateReadingTime(mdxContent) {
  const wordsPerMinute = 200;
  const text = mdxContent.replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    tag: { type: "string", required: true },
    title: { type: "string", required: true },
    cover: { type: "string", required: true },
    summary: { type: "string", required: true },
    publishedAt: { type: "date", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`
    },
    readingTime: {
      type: "number",
      resolve: (post) => calculateReadingTime(post.body.raw)
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-RAWRRQX7.mjs.map
