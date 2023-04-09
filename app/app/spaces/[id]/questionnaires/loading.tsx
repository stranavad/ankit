import { LoadingSkeleton } from "@/components/Skeleton";
import { skeletonQuestionnaires } from "@/components/Skeleton/data";

export default function() {
    return <LoadingSkeleton lines={skeletonQuestionnaires} title="Loading....." />;
}