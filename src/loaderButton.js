import React from "react";
import { BsArrowRepeat } from "react-icons/bs";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      type="submit"
      className={`LoaderButton bigbutton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </button>
  );
}
