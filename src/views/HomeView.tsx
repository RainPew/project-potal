import styled from "@emotion/styled";
import React from "react";
import { TitlePage } from "../components/tracking/SearchOrder";
import MainLayout from "../layout/MainLayout";

interface HomeViewProps {
  children?: Element;
}

const HomeView: React.FC<HomeViewProps> = () => {
  return (
    <MainLayout>
      <TemplateWrapper>
        <TitlePage>Dashboard</TitlePage>
      </TemplateWrapper>
    </MainLayout>
  );
};

export { HomeView };

const TemplateWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
