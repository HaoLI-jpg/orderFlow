import { useContext, useState, useEffect, createContext } from "react";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Link} from "react-router-dom";
import { RoutePathes } from "../RoutePathes";
import { FiSun } from "react-icons/fi";
import {appRouter} from "../util";

const SideBarContext = createContext(true);

export default function SideBar({ children }: {children: React.ReactNode}){


    const utils = appRouter.useContext();
    const [expanded, setExpanded] = useState(true);
    const changeIsDark = appRouter.setIsDark.useMutation({
        onSuccess: () => {
          utils.isDark.invalidate();
        }
      });
    var currentIsDark = appRouter.isDark.useQuery();

    if ( currentIsDark.data != undefined ) {
        if (currentIsDark.data) {
            document.documentElement.classList.add("dark");
        }else {
            document.documentElement.classList.remove("dark");
        }
    }

    const themeSwitch = () => {
        if (document.documentElement.classList.contains("dark")) {
            changeIsDark.mutate(false);
        }else {
            changeIsDark.mutate(true);
        }
    }

    return (
        <aside className="h-screen flex">
            <nav className="h-full flex flex-col bg-white dark:bg-gray-900 border-r dark:border-gray-500 shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <h1 className=
                    {`font-syne text-xl transition-all duration-200 text-blue-800 overflow-clip dark:text-red-400
                    ${expanded ? "w-auto opacity-100" : " w-0 opacity-0" }`}
                    >
                        OrderFlow
                    </h1>
                    <button onClick = {() => setExpanded(curr => !curr)} className ="p-1.5 mx-2 transition-all rounded-lg dark:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {expanded ? <BsChevronLeft /> : <BsChevronRight />}
                    </button>
                </div>
                <SideBarContext.Provider value = {expanded}>
                    <ul className="flex-1 px-3 h-auto">{children}</ul>
                </SideBarContext.Provider>

                <div className="flex py-3">
                    <ul className="flex-1 px-3 h-auto items-center">
                        <button onClick={() => themeSwitch()} className="flex relative items-center px-3 py-3 dark:text-red-400 rounded-md dark:hover:bg-gray-700" >
                            {currentIsDark.data? <MdOutlineDarkMode size={20}/>:<FiSun size={20}/>}
                        </button>
                        <SideBarContext.Provider value = {expanded}>
                            <Link to={RoutePathes.Setting}>
                                <SideBarItem icon={<FiSettings size={20}/>} name="Setting" active={location.pathname==RoutePathes.Setting} />
                            </Link>
                        </SideBarContext.Provider>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}

export function SideBarItem({ icon, name, active, alert }: {icon: any, name: string, active?: boolean, alert?: boolean}){
    const expanded = useContext(SideBarContext);

    return(

            <li className={`relative flex items-center py-2 px-3 my-2
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                    active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:bg-gradient-to-tr dark:from-indigo-900 dark:to-gray-700 dark:text-red-700" 
                    : "hover:bg-indigo-100 dark:hover:bg-gray-700 text-black"
                }
            `}>
                    <div className=" dark:text-red-400">
                        {icon}
                    </div>
                    <span className={`overflow-hidden transition-all dark:text-white 
                    ${expanded ? "w-32 ml-3" : "w-0"}`}>
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
            </li>

    )
}