interface PageWrapperProps {
    children: any;
}

const PageWrapper = ({children}: PageWrapperProps) => {
    return (
        <div className="max-w-4xl m-autobg-white px-5 py-3 rounded-md">
            {children}
        </div>
    )
}

export default PageWrapper;