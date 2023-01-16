import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Classes, Drawer, Position, Spinner } from "@blueprintjs/core";
import TrackingInfo from "./TrackingInfo";
import styled from "@emotion/styled";
import TrackingTabs from "./TrackingTabs";
import { Centered } from "react-spaces";
import { useTrackingDetails } from "./Detail";

const Dialog = styled(Drawer)``;

const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export interface DialogTrackingRef {
  open: () => void;
  close: () => void;
}

interface DialogTrackingProps {
  onRefetch: () => void;
  onClose: Function;
}

const DialogTracking = forwardRef<DialogTrackingRef, DialogTrackingProps>(
  ({ onRefetch, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { loading } = useTrackingDetails();

    useEffect(() => {
      if (isOpen) {
        const overlay = document.querySelector(
          "#drawer-detal-custom .bp4-overlay-start-focus-trap"
        );
        if (overlay) {
          overlay.setAttribute("tabindex", "null");
        }
      }
    }, [isOpen]);

    const open = useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen]);

    const close = useCallback(() => {
      setIsOpen(false);
      onClose();
    }, [setIsOpen, onClose]);

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <div id="drawer-detal-custom" data-testid="drawer-detal-custom">
        <Dialog
          isOpen={isOpen}
          usePortal={false}
          position={Position.BOTTOM}
          hasBackdrop={false}
          onClose={close}
          canOutsideClickClose={false}
          size="75%"
        >
          {loading && (
            <Centered>
              <Spinner />
            </Centered>
          )}
          <DialogBody
            className={`${Classes.DRAWER_BODY} overflow-hidden ${
              loading && "hidden-visibility"
            }`}
          >
            <TrackingInfo onClose={close} reload={onRefetch} />
            <TrackingTabs />
          </DialogBody>
        </Dialog>
      </div>
    );
  }
);

export default memo(DialogTracking);
