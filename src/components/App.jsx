import { Component } from 'react';
import { useState, useEffect } from 'react';
import { fetchImages } from './Api';
import { Audio } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largePhotoURL, setLargePhotoURL] = useState(null);
  const requestCheck =
    request.slice(request.indexOf('/') + 1, request.length) !== '';
  useEffect(() => {
    const getApiData = async () => {
      try {
        if (requestCheck) {
          setApiLoader(true);
          const images = await fetchImages({ request, page });
          if (page === 1) {
            setTotalHits(images.totalHits - 12);
          }
          setImages(prevState => [...prevState, ...images.hits]);
        }
      } catch (error) {
        toast.error('Error! Something was wrong!');
      } finally {
        setApiLoader(false);
      }
    };

    getApiData();
  }, [request, page, requestCheck]);

  const handlerSubmit = evt => {
    evt.preventDefault();
    setRequest(`${Date.now()}/${evt.target.elements.request.value.trim()}`);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const handlerClick = () => {
    if (request !== '') {
      setPage(prevState => prevState + 1);
      setTotalHits(prevState => prevState - 12);
    }
  };

  // const handlerGetInfoModal = value => {
  //   setLargePhotoURL(value);
  // };

  const handlerOpenModal = () => {
    setShowModal(true);
  };

  const handlerCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handlerSubmit} />
      <ImageGallery
        request={request}
        images={images}
        handlerGetInfoModal={setLargePhotoURL}
        handlerOpenModal={handlerOpenModal}
      />
      {apiLoader && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
          wrapperClassName
        />
      )}
      {totalHits > 0 && <Button onClickBtn={handlerClick} />}
      {showModal && (
        <Modal options={largePhotoURL} onCloseModal={handlerCloseModal} />
      )}
      <Toaster />
    </>
  );
};
export class OldApp extends Component {
  state = {
    request: '',
    images: [],
    page: 1,
    totalHits: 0,
    apiLoader: false,
    showModal: false,
    largePhotoURL: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        (prevState.request !== this.state.request ||
          prevState.page !== this.state.page) &&
        this.state.request.slice(
          this.state.request.indexOf('/') + 1,
          this.state.request.length
        ) !== ''
      ) {
        this.setState({
          apiLoader: true,
        });
        const images = await fetchImages(this.state);
        if (this.state.page === 1) {
          this.setState({
            totalHits: images.totalHits - 12,
          });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));
        this.setState({
          apiLoader: false,
        });
      }
    } catch (error) {
      toast.error('Error! Something was wrong!');
      this.setState({
        apiLoader: false,
      });
    }
  }
  handlerSubmit = evt => {
    evt.preventDefault();
    this.setState({
      request: `${Date.now()}/${evt.target.elements.request.value.trim()}`,
      images: [],
      page: 1,
      totalHits: 0,
    });
  };

  handlerClick = () => {
    if (this.state.request !== '') {
      this.setState(prevState => ({
        page: prevState.page + 1,
        totalHits: prevState.totalHits - 12,
      }));
    }
  };
  handlerGetInfoModal = value => {
    this.setState({ largePhotoURL: value });
  };

  handlerOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handlerCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handlerSubmit} />
        <ImageGallery
          options={this.state}
          handlerGetInfoModal={this.handlerGetInfoModal}
          handlerOpenModal={this.handlerOpenModal}
        />
        {this.state.apiLoader && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              justifyContent: 'center',
            }}
            wrapperClassName
          />
        )}
        {this.state.totalHits > 0 && <Button onClickBtn={this.handlerClick} />}
        {this.state.showModal && (
          <Modal
            options={this.state.largePhotoURL}
            onCloseModal={this.handlerCloseModal}
          />
        )}
        <Toaster />
      </>
    );
  }
}
