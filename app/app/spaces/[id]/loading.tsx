const Loading = () => {
    return (
        <div className="content">
            <div className="border bg-white rounded-md p-4 w-full h-56 mb-10">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-5 py-1">
                        <div className="h-2 bg-slate-400 rounded"/>
                        <div className="h-2 bg-slate-400 rounded mr-24"/>

                        <div className="h-2 bg-slate-400 w-1/3 rounded"/>
                        <div className="h-2 bg-slate-400 w-1/3 rounded"/>
                        <div className="h-2 bg-slate-400 w-1/3 rounded"/>
                        <div className="h-2 bg-slate-400 w-1/3 rounded"/>

                        <div className="h-2 bg-slate-400 rounded"/>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Loading;