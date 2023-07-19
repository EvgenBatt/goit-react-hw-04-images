import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Div } from './App.styled';
import { getImages } from '../service/Api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
        isLoading: false,
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  onHanleSubmit = value => {
    this.setState({ query: value, images: [], page: 1 });
  };

  openModal = e => {
    const bigImageUrl = e.target.dataset.large;
    const imageTags = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        bigImageUrl: bigImageUrl,
        imageTags: imageTags,
      }));
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      query,
      showModal,
      bigImageUrl,
      imageTags,
      isLoading,
      totalHits,
    } = this.state;

    const hideButton =
      images.length === 0 ||
      totalHits.length === 12 ||
      images.length >= totalHits;

    return (
      <>
        <Div>
          <Searchbar onSubmit={this.onHanleSubmit} />
          {images && (
            <ImageGallery images={images} openModal={this.openModal} />
          )}
          {query && images.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '24px' }}>
              No images were found for this query. Please try another search.
            </p>
          )}
          {isLoading && <Loader />}
          {showModal && (
            <Modal
              closeModal={this.closeModal}
              bigImageUrl={bigImageUrl}
              imageTags={imageTags}
            />
          )}
          {!hideButton && <Button onClick={this.onLoadMore} />}
        </Div>
      </>
    );
  }
}
