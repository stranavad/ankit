import { LoadingBunch } from "@/components/Skeleton";
import { skeletonQuestions } from "@/components/Skeleton/data";

export default function(){
    return <LoadingBunch lines={skeletonQuestions} count={4}/>
}