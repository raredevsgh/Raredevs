const IMAGE_TAG_NAME = "image";

function convertImageElement(element) {
  if (!(element instanceof Element)) return;
  if (element.tagName.toLowerCase() !== IMAGE_TAG_NAME) return;

  const img = document.createElement("img");

  Array.from(element.attributes).forEach((attribute) => {
    img.setAttribute(attribute.name, attribute.value);
  });

  if (!img.hasAttribute("alt")) {
    img.setAttribute("alt", "");
  }

  if (!img.hasAttribute("decoding")) {
    img.setAttribute("decoding", "async");
  }

  if (!img.hasAttribute("loading")) {
    img.setAttribute("loading", "lazy");
  }

  element.replaceWith(img);
}

function hydrateImageElements(root = document) {
  root.querySelectorAll(IMAGE_TAG_NAME).forEach(convertImageElement);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => hydrateImageElements(), {
    once: true,
  });
} else {
  hydrateImageElements();
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.tagName.toLowerCase() === IMAGE_TAG_NAME) {
        convertImageElement(node);
      }
      hydrateImageElements(node);
    });
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
