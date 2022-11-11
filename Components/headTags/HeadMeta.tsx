import { FC } from "react";
import Head from "next/head";

import { SOCIAL_IMG_URL_DEFAULT } from "../../utils/constants/consts";

const HeadMeta: FC = () => {
  return (
    <Head>
      <title>Clueless Words | Daily word game with Synonyms</title>
      <meta
        name="description"
        content="Can you use the clueless words (these synonyms) to solve the mystery word? You only have 6 tries! Wrong guesses will show up in the guess bucket!"
      />

      <meta
        property="og:title"
        content="Clueless Words | Daily word game with Synonyms"
      />
      <meta property="og:url" content="https://www.cluelesswords.com/" />
      <meta
        property="og:description"
        content="Can you use the clueless words (these synonyms) to solve the mystery word? You only have 6 tries! Wrong guesses will show up in the guess bucket"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={SOCIAL_IMG_URL_DEFAULT} />
      <meta property="og:site_name" content="Clueless Words" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cluelesswords.com" />
      <meta
        property="twitter:title"
        content="Clueless Words | Daily word game with Synonyms"
      />
      <meta
        property="twitter:description"
        content="Can you use the clueless words (these synonyms) to solve the mystery word? You only have 6 tries! Wrong guesses will show up in the guess bucket"
      />
      <meta property="twitter:image" content={SOCIAL_IMG_URL_DEFAULT} />

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
