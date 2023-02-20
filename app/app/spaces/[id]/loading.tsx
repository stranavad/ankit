import { LoadingSkeleton } from "@/components/Skeleton";
import { skeletonSpaceSettings } from "@/components/Skeleton/data";

export default function(){
    return <LoadingSkeleton lines={skeletonSpaceSettings}/>
}