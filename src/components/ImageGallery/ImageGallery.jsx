import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({
  options,
  handlerGetInfoModal,
  handlerOpenModal,
}) => {
  if (options.request !== '') {
    const imagesArr = options.images.map(el => (
      <ImageGalleryItem
        key={el.id}
        webformatURL={el.webformatURL}
        largeImageURL={el.largeImageURL}
        handlerGetInfoModal={handlerGetInfoModal}
        handlerOpenModal={handlerOpenModal}
      />
    ));
    return <GalleryList className="gallery">{imagesArr}</GalleryList>;
  }
};
