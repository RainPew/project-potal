import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

it("Can render component", async () => {
  await renderComponent();
});

const renderComponent = async () => {
  render(
    <Table
      bodyColumns={[]}
      dataSource={[]}
      headerColumns={[]}
      idKey="id"
      isLoading
      dataTestId="grid-table"
    />
  );
  const component = await screen.findByTestId("grid-table");
  expect(component).toBeInTheDocument();
  return component;
};
