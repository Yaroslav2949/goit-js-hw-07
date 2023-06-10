import { galleryItems } from "./gallery-items.js";
// Change code below this line

// рендеримо картинки

const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = galleryItems.map(
  ({ preview, original, description }) =>
    `<li class="gallery__item">
<a class="gallery__link" href="${original}">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`
);
galleryContainer.insertAdjacentHTML("beforeend", itemsMarkup.join(""));
galleryContainer.addEventListener("click", onClick);

// створюємо модалку

function onClick(evt) {
  evt.preventDefault();
  const isItemImage = evt.target.classList.contains("gallery__image");
  if (!isItemImage) return;
  const OriginalImgUrl = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${OriginalImgUrl}" />
        `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscPress);
      },

      onClose: (instance) => {
        window.removeEventListener("keydown", onEscPress);
      },
    }
  );
  instance.show();

  function onEscPress(evt) {
    const isEscKey = evt.code === "Escape";
    if (!isEscKey) return;

    instance.close();
  }
}
