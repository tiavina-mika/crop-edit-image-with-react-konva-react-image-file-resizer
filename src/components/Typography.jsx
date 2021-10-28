/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import { Typography as AntdTypography } from "antd";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/utils";

const {
  Text: AntdText,
  Title: AntdTitle,
  Paragraph: AntdParagraph
} = AntdTypography;

const classes = {
  noGutter: {
    marginBottom: "0px !important"
  }
};

const Typography = ({
  children,
  theme = "dark",
  gutterBottom = true,
  alignment = "left",
  className,
  variant = "text",
  level,
  ...rest
}) => {
  let Component;
  const otherProps = {};

  switch (variant) {
    case "title":
      Component = AntdTitle;
      otherProps.level = level;
      break;
    case "paragraph":
      Component = AntdParagraph;
      break;
    default:
      Component = AntdText;
  }
  return (
    <Component
      css={!gutterBottom && classes.noGutter}
      className={cx(
        level ? `h${level}` : "",
        "text" + capitalizeFirstLetter(alignment),
        variant === "title" ? "bold" : "text",
        "typography",
        className,
        theme || ""
      )}
      {...otherProps}
      {...rest}
    >
      {children}
    </Component>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3, 4]),
  theme: PropTypes.oneOf(["dark", "light", "lightDark", "active", "default"]),
  alignment: PropTypes.oneOf(["center", "left", "right"]),
  variant: PropTypes.oneOf(["text", "paragraph", "title"]),
  className: PropTypes.any,
  gutterBottom: PropTypes.bool
};

export default Typography;
