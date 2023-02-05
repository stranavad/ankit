const AnswerLayout = ({children}: any) => {

    return (
        <div
            className="bg-slate-100 dark:bg-gray-900 min-h-screen flex flex-col justify-top items-center pt-24 max-w-[100w] overflow-x-hidden relative">
            {children}
        </div>
    );
};

export default AnswerLayout;