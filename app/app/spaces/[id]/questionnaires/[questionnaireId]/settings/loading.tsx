import { LoadingBunch } from "@/components/Skeleton";
import { skeletonQuestionnaireSettings } from "@/components/Skeleton/data";

export default function(){
    return <LoadingBunch lines={skeletonQuestionnaireSettings} count={4}/>
}