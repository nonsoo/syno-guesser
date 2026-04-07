import { Suspense } from "react";

import ArchivedGame from "./ArchivedGamed";
import ArchivedGameLoadingFallback from "./ArchivedGameLoadingFallback";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata() {
  const title = "Clueless Words | Daily word game with Synonyms | Archive";
  return {
    title,
    openGraph: {
      title: title,
    },
    twitter: {
      title: title,
    },
    manifest: "/manifest.json",
  };
}

const RootPage = async (props: Props) => {
  return (
    <Suspense fallback={<ArchivedGameLoadingFallback />}>
      <ArchivedGame params={props.params} />
    </Suspense>
  );
};

export default RootPage;
