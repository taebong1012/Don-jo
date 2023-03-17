import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 50.75rem;
  height: 10rem;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background-color: white;
  padding: 1.25rem;
`;

export const ItemImg = styled.div`
  width: 10rem;
  min-width: 10rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  background-color: #ddd;
  margin-right: 0.75rem;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 28.75rem;
`;

export const Title = styled.h1`
  font-family: "RobotoMedium";
  line-height: 1.1875rem;
`;

export const Description = styled.label`
  font-family: "RobotoRegular";
  line-height: 1.5rem;
  color: var(--color-text-secondary);
`;

export const generateButton = styled.button`
  font-family: "RobotoMedium";
  width: 7.5rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: 0.125rem solid black;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  margin-left: 1.25rem;
  padding: 0 1.6875rem;
`;
