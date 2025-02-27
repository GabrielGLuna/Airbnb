'use client';
interface MenuLinkProps{
    label:string;
    onclick: ()=> void
}

const  MenuLink: React.FC<MenuLinkProps> = ({
    label,
    onclick
}) => {
    return(
        <div 
        onClick={onclick}
        className="cursor-pointer px-5 py-4 hover:bg-gray-100 transition">
            {label}
        </div>
    )
}
export default MenuLink