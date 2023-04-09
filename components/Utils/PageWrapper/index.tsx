interface PageWrapperProps {
    children: any;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className="max-w-5xl m-auto px-5 py-3 rounded-md bg-white">
            {children}
        </div>
    );
};

export default PageWrapper;