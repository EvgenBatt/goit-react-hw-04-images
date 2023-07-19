import { Watch } from 'react-loader-spinner';
import { WrapWatch } from './Loader.styled';

export const Loader = () => (
  <WrapWatch>
    <Watch
      height="150"
      width="150"
      radius="48"
      color="#3f51b5"
      ariaLabel="watch-loading"
      visible={true}
      timeout={5000}
    />
  </WrapWatch>
);
