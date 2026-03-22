import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { LogOutIcon, UserIcon, FileTextIcon, Layers, Layers2 } from "lucide-react";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-rose-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
            <Layers2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            ResumeBuilder
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 max-sm:hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
              <UserIcon className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Hi, {user?.name?.split(" ")[0] || user?.name}
              </span>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="group relative overflow-hidden flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-1.5 rounded-full transition-all duration-300 hover:shadow-md hover:border-slate-300 active:scale-95"
          >
            <LogOutIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700 transition-colors" />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
