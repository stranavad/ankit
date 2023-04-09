import { LoadingSkeleton } from "@/components/Skeleton";
import { skeletonSpaces } from "@/components/Skeleton/data";

export default function() {
    return <LoadingSkeleton lines={skeletonSpaces} />;
}