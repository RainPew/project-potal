import React from "react";
import { TitlePage } from "../components/tracking/SearchOrder";
import MainLayout from "../layout/MainLayout";

interface ReportViewProps {
  children?: Element;
}

const ReportView: React.FC<ReportViewProps> = () => {
  return (
    <MainLayout>
      <TitlePage>Report</TitlePage>
    </MainLayout>
  );
};

export { ReportView };
