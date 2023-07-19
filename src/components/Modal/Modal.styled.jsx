import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalDiv = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const Button = styled.button`
  width: 25px;
  height: 25px;
  margin: 0;
  font-size: 15px;
  color: #505050;
  background-color: #e8e8e8;
  cursor: pointer;
  opacity: 0.5;
  border: none;
  border-radius: 0 0 0 3px;
  padding: 4px;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    opacity: 1;
    color: #000;
  }
`;
