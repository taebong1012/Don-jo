import * as S from "./style";
import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

import FullScreenModal from "../FullScreenModal";
import BasicTitle from "../../BasicTitle";
import BasicInput from "../../BasicInput";

/**
 * 아이템 추가/수정 모달
 * @param {props} param0
 * @param {string} name - 아이템 이름
 * @param {number} price - 아이템 가격
 * @param {Object} image
 * @returns
 */

const AddItemModal = ({ handleSetShowModal }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemFeaturedImage, setItemFeaturedImage] = useState(null);
  const [itemFile, setItemNamFile] = useState(null);
  const [itemDescription, setItemDescription] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  return (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      <S.ContentWrap>
        <BasicTitle text="Name" />
        <S.BasicInputWrap>
          <BasicInput
            type="text"
            value={itemName}
            placeholder="Items Title"
            handleOnChangeValue={handleItemNameChange}
          />
        </S.BasicInputWrap>
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="Price" />
        <S.PriceInputWrap>
          <S.BasicInput
            type="text"
            value={itemPrice}
            placeholder="1000.000"
            onChange={handleItemPriceChange}
          />
          <S.UnitWrap>eth</S.UnitWrap>
        </S.PriceInputWrap>
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="Featured Image" />
        <S.ImageSizeInfo>
          We recommend an image at least 460px wide and 200px tall.
        </S.ImageSizeInfo>
        <S.AddButton>
          <S.AddIcon>
            <FiUpload size="20px" color="white" />
          </S.AddIcon>
        </S.AddButton>
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="File Upload" />
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="Description" />
      </S.ContentWrap>

      <S.ContentWrap>
        <BasicTitle text="Confirmation Message" />
      </S.ContentWrap>
    </FullScreenModal>
  );
};

export default AddItemModal;