import { FunctionComponent, memo } from "react";
import { Button } from "@blueprintjs/core";
import styled from "@emotion/styled";
import { IconNames } from "@blueprintjs/icons";
import { useTrackingDetails } from "../Detail";
import { isArray } from "lodash";

const Container = styled.div``;

const DocumentItem = styled(Button)`
  border: none !important;
  font-size: 13px;
  line-height: 15px;
  color: #102a47;
  display: block;
`;

interface DocumentsTabProps {}

const DocumentsTab: FunctionComponent<DocumentsTabProps> = () => {
  const documentsObj = useTrackingDetails()?.order?.OrderFiles?.OrderFile || [];

  const documents = isArray(documentsObj) ? documentsObj : [documentsObj];

  return (
    <Container data-testid="tracking-detail-documents">
      {documents.map((document: any) => (
        <DocumentItem
          icon={IconNames.Document}
          outlined
          key={document["@OrderFileID"]}
          data-testid="tracking-detail-documents-item"
        >
          #{document["@OrderFileID"]} {document["@FileName"]}
        </DocumentItem>
      ))}
    </Container>
  );
};

export default memo(DocumentsTab);
