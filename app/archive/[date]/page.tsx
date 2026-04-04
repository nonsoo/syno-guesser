import { Suspense, ViewTransition } from "react";

import ArchivedGame from "./ArchivedGamed";
import ArchivedGameLoadingFallback from "./ArchivedGameLoadingFallback";

interface Props {
  params: Promise<{ date: string }>;
}

const RootPage = async (props: Props) => {
  return (
    <ViewTransition>
      <Suspense fallback={<ArchivedGameLoadingFallback />}>
        <ArchivedGame params={props.params} />
      </Suspense>
    </ViewTransition>
  );
};

export default RootPage;
