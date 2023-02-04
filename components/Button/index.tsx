interface ButtonProps {
    onClick?: () => void;
    children: any;
    className?: string;
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
    type?: ButtonType;
}

type ButtonType = "default" | "success" | "error" | "warning"

export const Button = ({
    children,
    onClick,
    className,
    type = "default",
    secondary = false,
    disabled = false,
}: ButtonProps) => {
    let colorType;

    if (!secondary) {
        if (!disabled) {
            switch (type) {
            case "default":
                colorType = "bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-400";
                break;
            case "success":
                colorType = "bg-green-500 hover:bg-green-700 focus:ring-green-400";
                break;
            case "error":
                colorType = "bg-red-600 hover:bg-red-800 focus:ring-red-400";
                break;
            case "warning":
                colorType = "bg-orange-600 hover:bg-orange-800 focus:ring-orange-400";
                break;
            }
        } else {
            colorType = "bg-gray-300 text-gray-400 shadow-none cursor-not-allowed";
        }

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`text-white font-semibold rounded-md focus:outline-none focus:ring-2  focus:ring-opacity-75 ${colorType}  ${className}`}>
                {children}
            </button>
        );
    }

    if (!disabled) {
        switch (type) {
        case "default":
            colorType = "text-slate-800 border-gray-200 hover:bg-slate-100 focus:ring-slate-400";
            break;
        case "success":
            colorType = "text-green-400 border-green-200 hover:bg-green-100 focus:ring-green-400";
            break;
        case "error":
            colorType = "text-red-400 border-red-200 hover:bg-red-100 focus:ring-red-400";
            break;
        case "warning":
            colorType = "text-orange-400 border-orange-200 hover:bg-orange-100 focus:ring-orange-400";
            break;
        }
    } else {
        colorType = "bg-gray-300 text-gray-400 shadow-none cursor-not-allowed";
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-white font-semibold rounded-md border focus:outline-none focus:ring-2 focus:ring-opacity-75 ${colorType} ${className}`}>
            {children}
        </button>
    );

};

export default Button;