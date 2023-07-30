import { useContext, useState } from "react";
import {BsThreeDotsVertical, BsChevronLeft, BsChevronRight} from "react-icons/bs";
import { createContext } from "react";
import { Link } from "react-router-dom";

const SideBarContext = createContext(true);

export default function SideBar({ children }: {children: React.ReactNode}){
    const [expanded, setExpanded] = useState(true);
    return (
        <aside className="h-screen flex">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="https://img.logoipsum.com/243.svg" 
                    className={`overflow-hidden transition-all ${expanded ? 'w-32 h-9' : 'w-0 h-9'}`}
                    />
                    <button onClick = {() => setExpanded(curr => !curr)} className ="p-1.5 round-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <BsChevronLeft /> : <BsChevronRight />}
                    </button>
                </div>
                <SideBarContext.Provider value = {expanded}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SideBarContext.Provider>

                <div className = "border-t flex p-3">
                    <img src="https://img.logoipsum.com/243.svg" className="w-10 h-10 rounded-md"/>
                    <div className={`
                    flex justify-between items-center
                    overflow-hidden transition-all
                    ${expanded ? 'w-52 ml-3' : 'w-0'}
                    `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">user</h4>
                            <span className="text-xs text-gray-500">user@gmail.com</span>
                        </div>
                        <BsThreeDotsVertical size={20}/>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SideBarItem({ icon, name, active, alert, targetUrl }: {icon: any, name: string, active?: boolean, alert?: boolean, targetUrl: string}){

    const expanded = useContext(SideBarContext);

    return(
        <li className={`relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
                active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
                : "hover:bg-indigo-50 text-gray-600"
            }
        `}>
            <Link to={targetUrl} className={`flex`}>
                {icon}
                <span className={`overflow-hidden transition-all
                ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {name}
                </span>
                {alert &&
                    (<div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 
                        ${expanded ? "" : "top-2"}
                        `}/>
                )}

                {!expanded && 
                <div className={` absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm invisible opacity-20
                -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}>
                    {name}
                </div>}
            </Link>

        </li>
    )
}