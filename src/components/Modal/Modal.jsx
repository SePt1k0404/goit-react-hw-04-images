import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, ModalContent, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
  }
  handlerKeyDown = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    this.props.onCloseModal();
  };

  handlerBackDropClick = evt => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.props.onCloseModal();
  };
  render() {
    return createPortal(
      <ModalWrapper className="overlay" onClick={this.handlerBackDropClick}>
        <ModalContent className="modal">
          <ModalImage src={this.props.options} alt="somePhoto" />
        </ModalContent>
      </ModalWrapper>,
      modalRoot
    );
  }
}
