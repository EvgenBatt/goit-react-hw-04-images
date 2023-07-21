import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Div } from './App.styled';
import { getAllImages } from '../service/Api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [imageTags, setImageTags] = useState('');
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getAllImages(query, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onHandleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const openModal = e => {
    const bigImageUrl = e.target.dataset.large;
    const imageTags = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setBigImageUrl(bigImageUrl);
      setImageTags(imageTags);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hideButton =
    images.length === 0 ||
    totalHits.length === 12 ||
    images.length >= totalHits;

  return (
    <>
      <Div>
        <SearchBar onSubmit={onHandleSubmit} />
        {images && <ImageGallery images={images} openModal={openModal} />}
        {query && images.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '24px' }}>
            No images were found for this query. Please try another search.
          </p>
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            closeModal={closeModal}
            bigImageUrl={bigImageUrl}
            imageTags={imageTags}
          />
        )}
        {!hideButton && <Button onClick={onLoadMore} />}
      </Div>
    </>
  );
};
