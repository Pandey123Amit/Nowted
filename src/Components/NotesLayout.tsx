import { Outlet } from "react-router-dom";
import NotesBar from "../sharedcomponent/NotesBar";

function NotesLayout() {
    return (
        <div className="flex h-full">
            <div className="w-1/3 bg-gray-900 text-white">
                <NotesBar />
            </div>

            <div className="flex-1 bg-amber-100">
                <Outlet />
            </div>
        </div>
    );
}

export default NotesLayout;
