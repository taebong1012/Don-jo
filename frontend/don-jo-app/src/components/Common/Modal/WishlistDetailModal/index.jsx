import React, { useCallback, useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import BasicModal from "../BasicModal";
import BasicTitle from "../../BasicTitle";
import BasicButton from "../../BasicButton";
import BasicTextarea from "../../BasicTextarea";
import { useMediaQuery } from "react-responsive";
import FullScreenModal from "../FullScreenModal";
import { wishlistAPI } from "../../../../api/wishlist";

const WishlistDetailModal = ({
  uid,
  isDashboard,
  handleSetShowModal,
  setShowWishlistModal,
  setIsShowWishListModifyModal,
  handleOnClickButton,
}) => {
  const S3URL = "https://don-jo.s3.ap-northeast-2.amazonaws.com/";
  const [result, setResult] = useState({
    targetAmount: "0",
    collectedAmount: "0",
  });
  const [price, setPrice] = useState(0);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // 확인 메세지
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDeleteWishlistItem = useCallback(async () => {
    try {
      await wishlistAPI.deleteWishlistItem(uid);
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  const handleGetWishlistItemDetail = async () => {
    try {
      const { data } = await wishlistAPI.getWishlistItemDetail(uid);
      setResult(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    handleGetWishlistItemDetail();
  }, []);

  // 후원 상태바 계산을 위한 함수
  const handleCalcProgressState = () => {
    // 초기값 처리
    if (result.targetAmount === "0") return 0;

    if (Number(result.collectedAmount) >= Number(result.targetAmount)) {
      return 100;
    }
    return (Number(result.collectedAmount) / Number(result.targetAmount)) * 100;
  };

  const handleMakeModalContent = () => {
    return (
      <S.ContentWrapper>
        <S.WishlistContent>
          <S.wishlistImg
            src={
              result.imgPath !== undefined ? `${S3URL}${result.imgPath}` : ""
            }
            alt="wishlist-img"
          />
          <S.Content>
            <S.Title>{result.title}</S.Title>
            <S.Description>{result.description}</S.Description>
            <S.Price>
              {result.targetAmount} <S.Eth>eth</S.Eth>
            </S.Price>
          </S.Content>
        </S.WishlistContent>
        <S.ProgressBarWrapper isDashboard={isDashboard}>
          <S.ProgressBar>
            <S.ProgressState
              currentState={result === {} ? 0 : handleCalcProgressState()}
            />
          </S.ProgressBar>
          <S.AmountWrapper>
            <S.ProgressAmount>{result.collectedAmount}</S.ProgressAmount>
            <S.ProgressAmount isAllAmount={true}>
              /{result.targetAmount} <S.Eth>eth</S.Eth>
            </S.ProgressAmount>
          </S.AmountWrapper>
        </S.ProgressBarWrapper>
        {!isDashboard && (
          <div>
            <S.PriceInputWrapper>
              <BasicTitle text="Price" />
              <span>
                <S.PriceInput
                  type="number"
                  placeholder="1000.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <S.Eth>eth</S.Eth>
              </span>
            </S.PriceInputWrapper>
            <BasicTitle text="Confirmation Message" />
            <BasicTextarea
              handleOnChangeValue={setConfirmationMessage}
              placeholder="Thank you for supporting my wishlist!"
            />
          </div>
        )}
        <S.ButtonWrapper>
          {isDashboard && (
            <S.DeleteButton onClick={handleDeleteWishlistItem}>
              Delete
            </S.DeleteButton>
          )}
          <BasicButton
            text={isDashboard ? "Edit" : "Donate"}
            color="var(--color-primary)"
            isBackground={true}
            handleOnClickButton={handleOnClickButton}
          />
        </S.ButtonWrapper>
      </S.ContentWrapper>
    );
  };

  return isMobile ? (
    <FullScreenModal handleSetShowModal={handleSetShowModal}>
      {handleMakeModalContent()}
    </FullScreenModal>
  ) : (
    <BasicModal handleSetShowModal={handleSetShowModal} width={40}>
      {handleMakeModalContent()}
    </BasicModal>
  );
};

export default WishlistDetailModal;

WishlistDetailModal.propTypes = {
  uid: PropTypes.number.isRequired,
  idDashboard: PropTypes.bool,
  setShowWishlistModal: PropTypes.func.isRequired,
  handleOnClickButton: PropTypes.func.isRequired,
};
