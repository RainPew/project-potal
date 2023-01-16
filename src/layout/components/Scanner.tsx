import { Popover2 } from "@blueprintjs/popover2";
import styled from "@emotion/styled";
import { useState } from "react";
import * as variable from "../../utils/variable";
import PopOverContent from "./PopoverContent";
interface IScanner {
  dataScanner?: Array<ID>;
}
type ID = {
  id: string;
};
const Scanner = ({ dataScanner }: IScanner) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const NullData = () => {
    return (
      <WrapperNull>
        <ImageIcon src="/images/barcode.svg" />
        <Title>Use your scanner to register an order</Title>
      </WrapperNull>
    );
  };

  const Scanner = () => {
    return (
      <Popover2
        content={
          <ContentPopover>
            {dataScanner?.map(({ id }) => (
              <PopOverContent id={id} key={id} />
            ))}
          </ContentPopover>
        }
        interactionKind="click"
        isOpen={isOpen}
        usePortal={false}
        onInteraction={(state) => setIsOpen(state)}
        placement="bottom"
      >
        <FlexContainer>
          <ImageIcon src="/images/barcode.svg" />
          <Title2>{`${dataScanner?.length} orders registered`}</Title2>
        </FlexContainer>
      </Popover2>
    );
  };
  return <Container>{dataScanner ? <Scanner /> : <NullData />}</Container>;
};

const Title = styled.p`
  color: ${variable.COMPANY_COLOR};
`;
const Title2 = styled.p`
  color: ${variable.DEFAULT_COLOR};
`;
const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const WrapperNull = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Container = styled.div`
  .bp4-popover2 .bp4-popover2-arrow {
    display: none;
  }
  .bp4-popover2 .bp4-popover2-content {
    border-radius: 6px;
  }
  .bp4-popover2 {
    border-radius: 6px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;

const ContentPopover = styled.div`
  width: 250px;
  border-radius: 6px;
`;

export default Scanner;
