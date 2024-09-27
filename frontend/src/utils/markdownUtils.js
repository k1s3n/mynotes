import * as Showdown from 'showdown';

// Create and configure the Showdown converter
const converter = new Showdown.Converter();

// Extend the showdown converter to modify the rendering of images with alignment
converter.addExtension(() => {
  return [{
    type: 'output',
    regex: /<img src="([^"]+)" alt="([^"]*)" \/>/g,  // Match the <img> tag in the generated HTML
    replace: (match, src, alt) => {
      // Check if the src contains ?left or ?right in the query string
      const alignment = src.includes('?left') ? 'markdown-image-left'
                      : src.includes('?right') ? 'markdown-image-right'
                      : 'markdown-image';  // Default to center

      // Remove the alignment query from the image URL
      const cleanSrc = src.replace(/\?left|\?right/, '');

      // Return the modified <img> tag with the appropriate class
      return `<img src="${cleanSrc}" alt="${alt}" class="${alignment}" />`;
    }
  }];
}, 'imageAlignment');

// Utility function to convert markdown to HTML
export const convertMarkdownToHtml = (markdown) => {
  return converter.makeHtml(markdown);
};

  