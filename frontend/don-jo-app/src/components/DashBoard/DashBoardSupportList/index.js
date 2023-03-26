import React, { useEffect, useState } from "react";
import * as S from "./style";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import BasicTitle from "../../Common/BasicTitle";
import ShowMoreButton from "../../Common/ShowMoreButton";
import DashBoardListItem from "../DashBoardListItem";
import { supportApi } from "../../../api/support";
import { useSelector } from "react-redux";

const DashBoardSupportList = ({ type, pageNum, pageSize, setPageNum }) => {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const memberAddress = useSelector((state) => state.web3.walletAddress);

  const handleGetSupportList = async () => {
    try {
      const { status, data } = await supportApi.getSupportList(
        memberAddress,
        pageNum,
        pageSize,
        type
      );
      if (status === 200) {
        setResult(data);
        setPageNum((prev) => prev + 1);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    handleGetSupportList();
  }, []);

  return (
    <S.SupportListWrapper>
      <S.SupportListHeader>
        <BasicTitle text="Recent Support" />
        {location.pathname === "/dashboard/home" && (
          <S.EmojiList>
            <S.EmojiItem>🙏 Wishlist</S.EmojiItem>
            <S.EmojiItem>💰 Donation</S.EmojiItem>
            <S.EmojiItem>📁 items</S.EmojiItem>
          </S.EmojiList>
        )}
      </S.SupportListHeader>
      <S.SupportList length={result.length}>
        {result && result.length > 0 ? (
          result.map((item, index) => (
            <DashBoardListItem
              key={item.uid}
              supportType={item.supportType}
              amountEth={item.amountEth}
              arrivedDate={item.arrivedDate}
              from={item.fromMember}
              to={item.toMember}
            />
          ))
        ) : (
          <S.Message>There are no recent sponsorships.</S.Message>
        )}
        {result.length >= 10 && (
          <ShowMoreButton handleOnClickButton={handleGetSupportList} />
        )}
      </S.SupportList>
    </S.SupportListWrapper>
  );
};

export default DashBoardSupportList;

DashBoardSupportList.propTypes = {
  type: PropTypes.string.isRequired,
  pageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.string.isRequired,
  setPageNum: PropTypes.func.isRequired,
};
