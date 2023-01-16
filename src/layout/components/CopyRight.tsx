import styled from "@emotion/styled";
import { useMemo } from "react";
import { useApp } from "../../ApplicationProvider";
import { DEFAULT_COLOR } from "../../utils/variable";

interface ICopyRight {
  src?: string;
}
const CopyRight = ({ src }: ICopyRight) => {
  const appConfig = useApp().config;

  const color = useMemo(() => {
    const color = appConfig.Navbar?.Style?.Color || DEFAULT_COLOR;
    return color;
  }, [appConfig.Navbar?.Style]);

  const DEFAULT_IMAGE = "/images/e-courier-logo.svg";
  return (
    <Wrapper data-color={color}>
      <p>Powered by</p>
      <img
        src={src}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = DEFAULT_IMAGE;
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  p {
    color: ${(props: any) => props["data-color"]};
    opacity: 0.8;
    font-size: 13px;
    padding: 0;
    margin: 0;
  }
`;
export default CopyRight;
