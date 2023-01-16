import { Icon } from "@blueprintjs/core";
import styled from "@emotion/styled";
import * as variable from "../../utils/variable";

const PopOverContent = ({ id }: { id: string }) => {
  return (
    <Wrapper>
      <Id>{id}</Id>
      <Statuts>
        <img src="/images/checked.svg" alt="checked" />
        <Title>Scanned</Title>
      </Statuts>
      <Icon icon="trash" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 14px 14px 14px 12px;
  border: 1px solid #cbd0df;
`;
const Statuts = styled.div`
  width: 90px;
  height: 24px;
  border-radius: 4px;
  background: hsl(151, 63%, 40%, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
const Title = styled.p`
  color: ${variable.GREEN_COLOR};
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  text-align: justify;
  text-transform: uppercase;
`;
const Id = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: justify;
  color: #000a44;
`;
export default PopOverContent;
