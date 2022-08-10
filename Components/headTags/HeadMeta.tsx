import { FC } from "react";
import Head from "next/head";

const HeadMeta: FC = () => {
  return (
    <Head>
      <title>Clueless Words | Daily word game with Synonyms</title>
      <meta
        name="description"
        content="Can you use the clueless words (these synonyms) to solve the mystery word? You only have 6 tries! Wrong guesses will show up in the guess bucket!"
      />
      <link
        rel="shortcut icon"
        href="/favicon/favicon.ico"
        type="image/x-icon"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicon/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="favicon/android-chrome-192x192.png"
      />
      <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png" />
    </Head>
  );
};

export default HeadMeta;
