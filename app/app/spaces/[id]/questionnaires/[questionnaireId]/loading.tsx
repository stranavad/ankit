import { LoadingSkeleton } from "@/components/Skeleton";
import { skeletonQuestionnaireDashboard } from "@/components/Skeleton/data";

export default function(){
    return <LoadingSkeleton lines={skeletonQuestionnaireDashboard}/>
}