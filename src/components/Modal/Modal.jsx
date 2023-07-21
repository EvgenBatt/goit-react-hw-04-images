import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv, Button } from './Modal.styled';

export const Modal = ({ closeModal, bigImageUrl, imageTags }) => {
  const handleEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  });

  const clickBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={clickBackdrop}>
      <ModalDiv>
        <Button onClick={clickBackdrop}>X</Button>
        <img src={bigImageUrl} alt={imageTags} loading="lazy" width="1000px" />
      </ModalDiv>
    </Overlay>
  );
};

Modal.propTypes = {
  bigImageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
