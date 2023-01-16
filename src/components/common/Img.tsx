import React from "react";

type ImgProps = React.ComponentProps<"img"> & {
  alt: string;
};

const Img: React.FC<ImgProps> = ({ alt, ...rest }) => {
  return <img {...rest} alt={alt} />;
};

export { Img };
