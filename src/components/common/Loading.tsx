import React from "react";

interface LoadingProps {
  children?: Element;
}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div
      style={{
        borderTopColor: "transparent",
      }}
      className={`w-10 h-10 border-4 border-blue-400 border-double rounded-full animate-spin`}
      data-testid="loading"
    />
  );
};

export { Loading };
