import { Button, Dialog, Icon } from "@blueprintjs/core";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "../common/Input";
import { usePlaceOrder } from "./PlaceOrderProvider";
import { IconNames } from "@blueprintjs/icons";
interface ModalConfirmDiscardProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface EventConfirm {
  event: "POP" | "PUSH";
  router: string;
}

export interface ModalConfirmDiscardRefs {
  open: (event?: EventConfirm) => void;
  close: () => void;
}

const ModalConfirmDiscard = forwardRef<
  ModalConfirmDiscardRefs,
  ModalConfirmDiscardProps
>(({ onCancel, onConfirm }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<EventConfirm | null>(null);
  const history = useHistory();

  const open = useCallback(
    (event = null) => {
      setIsOpen(true);
      setEvent(event);
    },
    [setIsOpen]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const confirm = useCallback(() => {
    close();
    if (onConfirm) onConfirm();
    if (event) {
      if (event.event === "POP") history.goBack();
      else {
        history.push(event.router);
      }
    }
  }, [onConfirm, close, history, event]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close]
  );
  const { control } = usePlaceOrder().formState || {};
  return (
    <DialogWrapper isOpen={isOpen} onClose={onCancel}>
      <DialogHeader className="bp4-dialog-header" data-testid="confirm-discard">
        <TitleHeader className="bp4-heading">Pieces (6)</TitleHeader>
        <button
          aria-label="close"
          className="bp4-dialog-close-button bp4-button bp4-minimal bp4-icon-cross"
          onClick={close}
        ></button>
      </DialogHeader>
      <DialogContent className="bp4-dialog-body">
        <Container data-testid="save-ez-ship">
            <table style={{width: '100%'}}>
                <thead>
                    <tr><th style={{width: '20%'}}>Pieces</th><th>Piece Reference</th></tr>
                </thead>
                <tbody>
                 <tr>
                    <td>1</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference1"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || ""}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                  <tr>
                    <td>2</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference2"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || ""}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                  <tr>
                    <td>3</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference3"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || ""}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                 <tr>
                    <td>4</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference4"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || ""}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                 <tr>
                    <td>5</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference5"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || ""}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                 <tr>
                    <td>6</td>
                    <td>
                       <Content>
                          <Controller
                            name="reference6"
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <div className="ant-col ant-col-20">
                                <Input
                                  value={value}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  placeholder="Reference"
                                  label=""
                                  error={error?.message || "each piece must have a unique reference"}
                                  name="input-pieces"
                                />
                              </div>
                            )}
                          />
                          <DelIcon>
                            <Icon icon = {IconNames.Cross} color={`red`}/>
                          </DelIcon>
                      </Content>
                    </td>
                 </tr>
                </tbody>
            </table>
            
          <Content>
            <Button
                icon={IconNames.Plus}
                outlined
                style={{ color: "#102a47" }}
                data-testid="place-order-stops-item-add-stop"
              >
              Add Pieces
            </Button>
          </Content>
        </Container>
      </DialogContent>
      <div className="bp4-dialog-footer">
        <div className="bp4-dialog-footer-actions">
          <ButtonAction
            type="button"
            onClick={close}
            data-testid="confirm-discard-cancel"
          >
            Close
          </ButtonAction>
          <ButtonAction
            type="button"
            aria-label="confirm"
            onClick={confirm}
            data-testid="confirm-discard-ok"
          >
            Save
          </ButtonAction>
        </div>
      </div>
    </DialogWrapper>
  );
});

const DialogWrapper = styled(Dialog)`
  .bp4-dialog {
    padding: 24px;
  }
`;

const DialogHeader = styled.div`
  background-color: transparent;
  box-shadow: unset;
  margin-top: 14px;
`;

const DialogContent = styled.div`
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: justify;
  color: #000;
  span {
    font-weight: 500;
  }
`;

const DelIcon = styled.div`
  margin-top: 5px
`;


const ButtonAction = styled.button`
  padding: 10px 24px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: justify;
  ${(props) =>
    props["aria-label"] === "confirm"
      ? `
        border-radius: 6px;
        box-shadow: 0 2px 1px 0 rgba(44, 58, 110, 0.12);
        border: solid 1px rgba(0, 0, 0, 0.2);
        background-color: #102a47;
        color: #fff;
    `
      : "color: #102a47;"}
`;

const Container = styled.div`
  width: 100%;
  padding: 8px;
`;

const Content = styled.div`
  margin-top: ${(props: any) => props["data-margintop"] || "6px"};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
`;

const TitleHeader = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #102a47;
`;

export default memo(ModalConfirmDiscard);
