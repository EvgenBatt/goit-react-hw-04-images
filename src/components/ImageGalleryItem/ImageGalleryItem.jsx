import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <Li>
      <Img
        src={webformatURL}
        alt={tags}
        data-large={largeImageURL}
        loading="lazy"
        onClick={openModal}
      />
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
