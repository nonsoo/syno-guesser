import { Suspense } from "react";

import ArchivedGame from "./ArchivedGamed";
import ArchivedGameLoadingFallback from "./ArchivedGameLoadingFallback";

interface Props {
  params: Promise<{ date: string }>;
}

const RootPage = async (props: Props) => {
  return (
    <Suspense fallback={<ArchivedGameLoadingFallback />}>
      <ArchivedGame params={props.params} />
    </Suspense>
  );
};

export default RootPage;
