/* eslint-disable no-unused-vars */
import React from "react";
import screensizes from "data/screensizes";
import PropTypes from "prop-types";
import cx from "classnames";
import useMaxWidth from "hooks/useMaxWidth";
import { Icon, Logo } from "components";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from "./Footer.module.scss";

const Footer = ({ className }) => {
  const { width } = useWindowDimensions();
  const maxWidth = useMaxWidth();
  return (
    <footer className={styles.root}>
      <div {...maxWidth} className={cx(styles.footer, className)}>
        <div>
          {width < screensizes.default ? (
            <>
              {width > screensizes.tabletsPortrait ? (
                <Logo className={styles.logo} inverted />
              ) : null}
            </>
          ) : (
            <>
              <Logo className={styles.logo} withTitle inverted />
            </>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.row}>
            <Icon className={styles.icons} name="phone" />
            <p>444 4444</p>
          </div>
          <div className={styles.row}>
            <Icon className={styles.icons} name="email" />
            <p>kontaktar@kontaktar.is</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  className: PropTypes.string
};
Footer.defaultProps = {
  className: ""
};
