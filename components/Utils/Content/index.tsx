import PageHeader from "@/components/Utils/PageHeader";

const Content = ({ children, twoColumn = false, header = null }: {
    children: any,
    twoColumn?: boolean,
    header?: string | null
}) => {
    if (twoColumn) {
        return (
            <div className="max-w-5xl m-auto px-3">
                {header && <PageHeader title={header} />}
                <div className="flex">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl m-auto px-3">
            {children}
        </div>
    );
};

export default Content;