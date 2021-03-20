import React, { useEffect } from "react";
import { useRouter } from "next/router";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { MainLayout, RegisterContainer } from "layouts";

const Register = ({ reroute }) => {
  const router = useRouter();
  useEffect(() => {
    if (reroute) {
      router.push("/profile");
    }
  });
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req, res }) => {
    const user = req.session.get("user");

    if (user !== undefined) {
      return { props: { reroute: true } };
    }
    return {
      props: {}
    };
  })
);

export default Register;