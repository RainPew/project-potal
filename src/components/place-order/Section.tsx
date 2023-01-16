import { Collapse } from "@blueprintjs/core";
import styled from "@emotion/styled";
import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { bps } from "../common/Constants";

interface SectionProps {
  title: string;
  body: ReactNode;
  hasButtonCollapse: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  body,
  hasButtonCollapse,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SectionContainer data-testid="place-order-section">
      <HeaderSectionContainer>
        <TitleSection>{title}</TitleSection>
        {hasButtonCollapse && (
          <svg
            onClick={() => {
              setIsOpen((prev) => {
                return !prev;
              });
            }}
            className={clsx(
              ` transform duration-200 cursor-pointer hover:bg-slate-100 rounded translate-x-[8px]`,
              isOpen ? " rotate-0 " : " rotate-180"
            )}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.3956 12.7003C15.751 12.4335 16.2399 12.4332 16.5956 12.6997L20.5997 15.6997C21.0417 16.0309 21.1315 16.6576 20.8004 17.0996C20.4692 17.5416 19.8424 17.6314 19.4005 17.3003L15.9966 14.75L12.6005 17.2997C12.1588 17.6313 11.5319 17.5421 11.2004 17.1004C10.8688 16.6587 10.958 16.0319 11.3997 15.7003L15.3956 12.7003Z"
              fill="#102A47"
            />
          </svg>
        )}
      </HeaderSectionContainer>

      {isOpen && <Spacer style={{}}></Spacer>}
      <Collapse isOpen={isOpen} keepChildrenMounted={true}>
        {body}
      </Collapse>
    </SectionContainer>
  );
};

export { Section };

const SectionContainer = styled.div`
  background: #ffffff;

  box-shadow: 0 2px 1px 0 rgba(44, 58, 110, 0.06), inset 0 1px 0 0 #cbd0df,
    inset 0 -1px 0 0 #cbd0df;
  padding: 12px 16px 20px 16px;

  @media (min-width: ${bps["sm"]}px) {
    border-radius: 6px;
    padding: 24px;
    box-shadow: 0px 2px 1px rgba(44, 58, 110, 0.06);
    border: 1px solid #cbd0df;
  }
  @media (min-width: ${bps["md"]}px) {
  }
  @media (min-width: ${bps["lg"]}px) {
  }
  @media (min-width: ${bps["xl"]}px) {
  }
  @media (min-width: ${bps["2xl"]}px) {
  }
`;

const HeaderSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleSection = styled.h3`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: right;
  color: #102a47;
`;

const Spacer = styled.div`
  height: 12px;
`;
