interface CustomButtonProps{
    label: string;
    onclick: ()=> void;
    className?: string;
}

const CustomButton : React.FC<CustomButtonProps>= ({
    label,
    onclick,
    className
}) =>{
    return(
        <div 
        onClick={onclick}
        className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white rounded-xl text-center transition cursor-pointer ${className}`}>
            {label} 
        </div>
    )
}
export default CustomButton