import { Outlet } from "react-router-dom";

export default function NotesLayout() {
    return (
        <div className="flex w-full h-full">
            <div className="w-1/3 bg-gray-800 text-white">
                {/* Left panel (Notes list) */}
                <Outlet context={{ panel: "list" }} />
            </div>
            <div className="flex-1 bg-amber-100">
                {/* Right panel (Details) */}
                <Outlet context={{ panel: "details" }} />
            </div>
        </div>
    );
}
