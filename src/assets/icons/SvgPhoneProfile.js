/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from "react";

const SvgPhoneProfile = ({ color }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2188 0.78125L13.0938 0.03125C12.625 -0.0625 12.1562 0.15625 11.9688 0.59375L10.5 4C10.3438 4.40625 10.4375 4.875 10.7812 5.125L12.4688 6.5C11.4062 8.6875 9.65625 10.4375 7.46875 11.5L6.09375 9.8125C5.84375 9.46875 5.375 9.375 4.96875 9.53125L1.5625 11C1.15625 11.1875 0.90625 11.6562 1 12.0938L1.75 15.25C1.84375 15.6875 2.21875 16 2.6875 16C10.5625 16 17 9.625 17 1.71875C17 1.25 16.6875 0.875 16.2188 0.78125ZM2.71875 15L2 11.9062L5.34375 10.4688L7.21875 12.75C10.4375 11.2188 12.1875 9.46875 13.7188 6.25L11.4375 4.375L12.875 1.03125L15.9688 1.75C15.9688 9.0625 10.0312 15 2.71875 15Z"
      fill={color || "black"}
    />
  </svg>
);

export default SvgPhoneProfile;
