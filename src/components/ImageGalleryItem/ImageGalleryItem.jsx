import { GalleryListItem, GalleryListImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  handlerGetInfoModal,
  handlerOpenModal,
}) => {
  return (
    <GalleryListItem
      onClick={() => {
        handlerGetInfoModal(largeImageURL);
        return handlerOpenModal();
      }}
      className="gallery-item"
    >
      <GalleryListImage src={webformatURL} alt="somePhoto" />
    </GalleryListItem>
  );
};
