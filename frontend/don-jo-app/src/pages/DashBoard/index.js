import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { Desktop } from "../../components/Common/Template";
import DashBoardContent from "../../components/DashBoard/DashBoardContent";
import NavBar from "../../components/DashBoard/NavBar";
import * as S from "./style";
const DashBoard = () => {
  const location = useLocation();
  const isTablet = useMediaQuery({ maxWidth: 1280 });
  const [isToggleStatus, setToggleClassName] = useState(false);

  const handleOnClickButton = () => {
    setToggleClassName((prev) => !prev);
    document.body.style.overflow = isToggleStatus ? "unset" : "hidden";
  };

  // 메뉴바 상태에 따른 처리
  useEffect(() => {
    if (!isToggleStatus) return;

    setToggleClassName(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.body.style.overflow = "unset";
  }, [location.pathname]);

  return (
    <S.Container>
      <S.DashboardWrapper>
        <Desktop>
          <NavBar />
        </Desktop>
        {isToggleStatus && (
          <S.MenuWrapper>
            <S.MenuBarBackground onClick={handleOnClickButton} />
            <NavBar />
          </S.MenuWrapper>
        )}

        {isTablet && (
          <S.HamburgerMenu onClick={handleOnClickButton}>
            <div id="nav-icon3" className={isToggleStatus ? "open" : ""}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </S.HamburgerMenu>
        )}

        <DashBoardContent />
      </S.DashboardWrapper>
    </S.Container>
  );
};

export default DashBoard;