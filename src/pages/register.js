import React from "react";
import { useDispatch, useStore } from "react-redux";
import { MainLayout } from "layouts";
import {
  createUser,
  editUser,
  getUser,
  fetchUserExperiences
} from "../store/actions";

const Register = () => {
  const store = useStore();
  console.log("GLOBAL STORE:", store.getState());

  const dispatch = useDispatch();
  const registerNewUser = () => {
    // temp quick update user for testing
    const updateUser = "03";
    dispatch(
      createUser({
        ssn: `12345678${updateUser}`,
        userName: `new_user_name${updateUser}`,
        firstName: "Test",
        lastName: "Testerson",
        email: `email@email${updateUser}.is`,
        website: "website.com",
        phoneNumber: "123456",
        streetName: "______XY____ 10",
        city: "RCK",
        postalCode: 120,
        country: "Niceland"
      })
    );
    console.log("GLOBAL STORE:", store.getState());
  };
  const editUserTest = () => {
    const userId = 41;
    const updateUser = "02";
    dispatch(
      editUser(userId, {
        ssn: `12345678${updateUser}`,
        userName: `new_user_name${updateUser}`,
        firstName: "Test",
        lastName: "Testerson",
        email: `email@email${updateUser}.is`,
        website: "website.com",
        phoneNumber: "123456",
        streetName: "______XY____ 10",
        city: "RCK",
        postalCode: 120,
        country: "Niceland"
      })
    );
  };
  const getUserTest = () => {
    const userId = 41;
    dispatch(getUser(userId));
  };
  const getUserTest2 = () => {
    const userId = 2;
    dispatch(getUser(userId));
  };
  const getUserExperience = () => {
    const userId = 2;
    dispatch(fetchUserExperiences(userId));
  };
  const getUserExperience2 = () => {
    const userId = 3;
    dispatch(fetchUserExperiences(userId));
  };
  return (
    <MainLayout>
      <button type="button" onClick={registerNewUser}>
        Register
      </button>
      <button type="button" onClick={editUserTest}>
        Edit User
      </button>
      <button type="button" onClick={getUserTest}>
        Get User
      </button>
      <button type="button" onClick={getUserTest2}>
        Get User2
      </button>
      <button type="button" onClick={getUserExperience}>
        GetUserExp
      </button>
      <button type="button" onClick={getUserExperience2}>
        GetUserExp2
      </button>
    </MainLayout>
  );
};

export default Register;
