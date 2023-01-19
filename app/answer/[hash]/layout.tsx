const AnswerLayout = ({children}: any) => {

    return (
        <div className="bg-slate-200 dark:bg-gray-900 min-h-screen flex flex-col justify-top items-center pt-24">
            {children}
        </div>
    )
}

export default AnswerLayout;