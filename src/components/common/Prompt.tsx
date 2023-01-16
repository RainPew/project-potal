import { FunctionComponent, memo, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as H from "history";

interface IPrompt {
  message:
    | string
    | ((location: H.Location, action: H.Action) => string | boolean);
  when?: boolean | undefined;
}

const Prompt: FunctionComponent<IPrompt> = ({ message, when = true }: any) => {
  const history = useHistory();
  const release = useRef<any>(null);

  const method = useMemo(() => history.block, [history.block]);

  useEffect(() => {
    if (!when) return;
    if (release.current) release.current();
    release.current = method(message);
    return () => {
      if (release.current) release.current();
    };
  }, [message, method, when]);

  return null;
};

export default memo(Prompt);
