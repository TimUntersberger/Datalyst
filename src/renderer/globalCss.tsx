import { css } from "styled-components";

export const ScrollbarCSS = css`
  ::-webkit-scrollbar {
    width: 6px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #b2b2b2;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 16px;
  }
`;
