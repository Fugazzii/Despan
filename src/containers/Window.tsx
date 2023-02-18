interface Props {
    children: JSX.Element
}

export default function Window({ children }: Props) {
    return (
        <div className="w-3/4 h-[70vh] bg-gray-900 rounded-xl border-none
        text-white flex flex-col justify-start items-center">
            {children}
        </div>
    );
}