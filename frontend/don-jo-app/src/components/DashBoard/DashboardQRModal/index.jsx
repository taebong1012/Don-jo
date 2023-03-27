import React, { useRef } from "react";
import * as S from "./style";
import BasicModal from "../../Common/Modal/BasicModal";
import { QRCode } from "react-qrcode-logo";
import BasicButton from "../../Common/BasicButton";
import { toPng } from "html-to-image";

const QRCodeModal = ({ handleSetShowModal }) => {
  const ref = useRef(null);

  const handleOnClickDownloadButton = () => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `QR-Code.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BasicModal handleSetShowModal={handleSetShowModal}>
      <S.Content>
        <div ref={ref}>
          <QRCode
            value="https://j8a209.p.ssafy.io"
            size="200"
            fgColor="black"
            logoWidth="42"
            qrStyle="dots"
            eyeRadius={10}
            enableCORS={true}
            logoPadding={4}
            logoPaddingStyle={"square"}
          />
        </div>
        <S.ButtonWrapper>
          <BasicButton
            color="var(--color-primary)"
            isBackground={true}
            text="Download"
            handleOnClickButton={handleOnClickDownloadButton}
          />
        </S.ButtonWrapper>
      </S.Content>
    </BasicModal>
  );
};

export default QRCodeModal;
