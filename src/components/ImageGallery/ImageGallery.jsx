import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({
  request,
  images,
  handlerGetInfoModal,
  handlerOpenModal,
}) => {
  if (request !== '') {
    const imagesArr = images.map(el => (
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
