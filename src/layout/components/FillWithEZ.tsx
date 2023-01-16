import { Icon } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import styled from "@emotion/styled";
import { useState } from "react";
import { breakpointToggleSidebar } from "../../components/common/Constants";
import { fakeData } from "../../contants/contants";
import PopOverContent from "./PopoverContent";

const FillWithEZ = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Container>
      <Popover2
        content={
          <ContentPopover>
            {fakeData.map(({ id }) => (
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
          <Title>Fill with EZ Ship</Title>
          <MobileTitle> EZ Ship</MobileTitle>
          <Icon icon="caret-down" size={20} />
        </FlexContainer>
      </Popover2>
    </Container>
  );
};

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
const Title = styled.div`
  font-size: 16px;
  color: #102a47;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: none;
  }
`;

const MobileTitle = styled.div`
  font-size: 16px;
  color: #102a47;
  display: none;
  @media only screen and (max-width: ${breakpointToggleSidebar}px) {
    display: block;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ContentPopover = styled.div`
  width: 250px;
  border-radius: 6px;
`;

export default FillWithEZ;
