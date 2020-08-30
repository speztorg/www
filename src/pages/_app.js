/* eslint-disable unicorn/prevent-abbreviations */
import React from "react";
// import App from "next/app";
import Head from "next/head";
import { END } from "redux-saga";
import { SWRConfig } from "swr";
import fetch from "../lib/fetchJson";
import useUser from "../lib/useUser";
import wrapper from "../store/configureStore";

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  const { user } = useUser();

  // componentDidMount() {
  //   // Remove the server-side injected CSS. - MaterialUI
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.remove();
  //   }
  // }

  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (error) => {
            console.error(error);
          }
        }}
      >
        <Head>
          <title>Spez</title>
        </Head>
        <Component isLoggedIn={user && user.isLoggedIn} {...pageProps} />
      </SWRConfig>
    </>
  );
};
App.getInitialProps = async ({ Component, ctx }) => {
  const { req, store } = ctx;

  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  };

  // 2. Stop the saga if on server
  if (req) {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }

  return { pageProps };
};
export default wrapper.withRedux(App);
