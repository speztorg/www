/* eslint-disable no-nested-ternary */
import { ReactElement, useEffect, useState } from "react";
import AvailableIcon from "@material-ui/icons/CheckCircleOutline";
import NotAvailableIcon from "@material-ui/icons/HighlightOff";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import listOfReservedUserNames from "data/reservedUserNames";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector } from "react-redux";
import { registerErrors } from "helpers/errorMessages";
import { registerFormSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { GetAllUserNames } from "pages/api/endpoints";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = (): ReactElement => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isBeingLoggedIn, setIsBeingLoggedIn] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [isUserNameTaken, setUserNameIsTaken] = useState(false);
  const [isUserNameCheckEmpty, setUserNameCheckEmpty] = useState(true);
  const [allUserNames, setAllUserNames] = useState([]);
  const users = useSelector((state) => state.users);
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      ssn: "",
      email: "",
      firstName: "",
      lastName: ""
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const body = {
        userName: values.userName,
        password: values.password,
        ssn: values.ssn,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName
      };

      try {
        setLoader(true);
        await register(body);

        setHasRegistered(true);

        Router.push("/profill");
      } catch (error) {
        setErrorMessage(error.message);
        // eslint-disable-next-line no-console
        console.error(error, error.message);
        setLoader(false);
      }
    }
  });

  useEffect(() => {
    if (users && !users.error && hasRegistered) {
      setIsBeingLoggedIn(true);
    } else if (users.error) {
      setIsBeingLoggedIn(false);
      setErrorMessage(users.error.response.error);
    }
  }, [hasRegistered, users, users.error]);

  useEffect(() => {
    if (
      formik.values.userName.length > 2 && // we want to show the minmum userName length error if under 3 letters.
      isUserNameTaken &&
      formik.errors.userName !== registerErrors.EXISTS_USER_NAME
    ) {
      formik.setFieldError("userName", registerErrors.EXISTS_USER_NAME);
    }
  }, [isUserNameTaken, formik]);

  useEffect(() => {
    if (allUserNames.length === 0) {
      const fetchAllUserNames = async () => {
        setAllUserNames(await GetAllUserNames());
      };
      fetchAllUserNames();
    }
  });
  const checkIfUserNameIsTaken = async (userName: string) => {
    setUserNameCheckEmpty(false);
    const isUserNameValid =
      userName.length > 2 && !listOfReservedUserNames.includes(userName);
    if (
      !isUserNameValid ||
      (allUserNames.length > 0 && allUserNames.includes(userName))
    ) {
      setUserNameIsTaken(true);
    } else {
      setUserNameIsTaken(false);
    }
  };

  return (
    <div {...useMaxWidth()}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <span className={styles.heading}>Nýskráning</span>

        <div className={styles.row}>
          <MUIInput
            type="text"
            className={styles.form_firstName}
            id={styles.firstName}
            name="firstName"
            placeholder="Fornafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("firstName", true, true)}
            value={formik.values.firstName}
            error={formik.errors.firstName}
            isTouched={formik.touched.firstName}
          />
          <MUIInput
            type="text"
            className={styles.form_lastName}
            id="lastName"
            name="lastName"
            placeholder="Eftirnafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("lastName", true, true)}
            value={formik.values.lastName}
            error={formik.errors.lastName}
            isTouched={formik.touched.lastName}
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="number"
            id={styles.ssn}
            className={styles.form_ssn}
            name="ssn"
            placeholder="Kennitala"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("ssn", true, true)}
            value={formik.values.ssn}
            error={formik.errors.ssn}
            isTouched={formik.touched.ssn}
          />
          <MUIInput
            type="text"
            className={styles.form_email}
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("email", true, true)}
            value={formik.values.email}
            error={formik.errors.email}
            isTouched={formik.touched.email}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.display_username_card}>
            <span className={styles.info}>
              Svona mun slóðin á þinn prófil líta út.
            </span>
            <span className={styles.url}>
              kontaktar.is/
              <strong>{formik.values.userName || "notandi"}</strong>
            </span>
          </div>
          <div className={styles.username_icon}>
            {isUserNameCheckEmpty ? (
              <CircleIcon className={styles.icon_inactive} />
            ) : isUserNameTaken ? (
              <NotAvailableIcon className={styles.icon_not_available} />
            ) : (
              <AvailableIcon className={styles.icon_is_checked} />
            )}
          </div>

          <MUIInput
            type="text"
            className={styles.form_userName}
            id="userName"
            name="userName"
            placeholder="Notendanafn / slóð"
            onChange={(event) => {
              formik.handleChange(event);
              setUserNameCheckEmpty(true);
              checkIfUserNameIsTaken(event.target.value);
            }}
            onBlur={(event) => {
              formik.setFieldTouched("userName", true, true);
              checkIfUserNameIsTaken(event.target.value);
            }}
            value={formik.values.userName}
            error={formik.errors.userName}
            isTouched={formik.touched.userName}
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="password"
            className={styles.form_password}
            id="password"
            name="password"
            placeholder="Lykilorð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("password", true, true)}
            value={formik.values.password}
            error={formik.errors.password}
            isTouched={formik.touched.password}
          />
          <MUIInput
            type="password"
            className={styles.form_password}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Staðfesta lykilorð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("confirmPassword", true, true)}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
            isTouched={formik.touched.confirmPassword}
          />
        </div>
        <p className={styles.error}>{errorMessage}</p>
        <Button
          disabled={isBeingLoggedIn}
          type="submit"
          isLoading={isLoading}
          className={styles.button}
        >
          Nýskrá
        </Button>
      </form>
    </div>
  );
};

export default RegisterContainer;

RegisterContainer.propTypes = {
  className: PropTypes.string
};
RegisterContainer.defaultProps = {
  className: ""
};
