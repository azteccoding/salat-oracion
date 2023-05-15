import React from "react";
import Head from "next/head";

const Header = (data) => {
  return (
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.content} />
      <link rel="icon" href={data.icon} />
    </Head>
  );
};

export default Header;
