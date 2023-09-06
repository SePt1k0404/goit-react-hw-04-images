import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onClickBtn }) => {
  return (
    <LoadMoreBtn onClick={onClickBtn} type="button">
      Load more
    </LoadMoreBtn>
  );
};
