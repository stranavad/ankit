import { useMemo } from "react"
import Content from "../Utils/Content";

interface LoadingSkeletonProps {
    lines: string[]
    title?: string | null;
}

export const LoadingSkeleton = ({lines, title=null}: LoadingSkeletonProps) => {
    if(title){
        return (
            <Content>
                <h2 className="text-2xl font-bold mb-5">{title}</h2>
                <div className="border bg-white rounded-md p-4 w-full mx-auto max-w-4xl h-56 mb-10">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-5 py-1">
                            {lines.map((width, index) => (
                                <div key={index} className={`h-2 bg-slate-400 rounded ${width}`}/>
                            ))}
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
    
    return (
        <div className="border bg-white rounded-md p-4 w-full mx-auto max-w-4xl h-56 mb-10">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-5 py-1">
                    {lines.map((width, index) => (
                        <div key={index} className={`h-2 bg-slate-400 rounded ${width}`}/>
                    ))}
                </div>
            </div>
        </div>
    )

}

export const LoadingBunch = ({lines, count, title}: {lines: LoadingSkeletonProps['lines'], count: number, title?: LoadingSkeletonProps['title']}) => {
    const items = useMemo<number[]>(() => {
        const data = [];
        for(let i = 0; i< count; i++){
            data.push(i);
        }
        return data;
    }, [count]);

    return <>{items.map((index) => <LoadingSkeleton key={index} lines={lines} title={title}/>)}</>
}