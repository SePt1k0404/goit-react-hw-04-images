import { Component } from 'react';
import { fetchImages } from './Api';
import { Audio } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
export class App extends Component {
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
