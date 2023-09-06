import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, ModalContent, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ options, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlerKeyDown);

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  });

  const handlerKeyDown = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    onCloseModal();
  };

  const handlerBackDropClick = evt => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    onCloseModal();
  };

  return createPortal(
    <ModalWrapper className="overlay" onClick={handlerBackDropClick}>
      <ModalContent className="modal">
        <ModalImage src={options} alt="somePhoto" />
      </ModalContent>
    </ModalWrapper>,
    modalRoot
  );
};
