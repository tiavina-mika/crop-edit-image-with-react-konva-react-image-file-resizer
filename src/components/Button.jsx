/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { LoadingOutlined } from "@ant-design/icons";
import { cx } from "@emotion/css";
import { Button as AntdButton } from "antd";
import PropTypes from "prop-types";

const classes = {
  loading: {
    marginRight: 10
  }
};

const Button = ({
  text,
  htmlType = "button",
  className,
  disabled = false,
  onClick,
  type = "primary",
  fullWidth,
  children,
  loading,
  icon,
  ...buttonProps
}) => {
  return (
    <AntdButton
      className={cx(
        "flexCenter button buttonText",
        "button-" + type,
        className,
        fullWidth ? "fullWidth" : "",
        htmlType === "submit" ? "submitButton" : ""
      )}
      htmlType={htmlType === "submit" ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      <div className="flexRow alignCenter">
        {loading && <LoadingOutlined css={classes.loading} />}
        {icon}
        {children || text}
      </div>
    </AntdButton>
  );
};

Button.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string,
  children: PropTypes.node,
  htmlType: PropTypes.oneOf(["submit", "button", "reset"]),
  className: PropTypes.any,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    "primary",
    "ghost",
    "link",
    "dashed",
    "text",
    "default",
    "danger"
  ]),
  fullWidth: PropTypes.bool,
  buttonProps: PropTypes.any
};

export default Button;
