
const Navbar = ({ setToken }) => {

  const logoutHandler = () => {
    setToken("");
    window.localStorage.removeItem("Token");
  };

  return (
    <div className="py-5 flex items-center justify-between">
      {/* Logo */}
      <div>
        <p className="text-xl">Product Management System</p>
      </div>
      {/* Logout */}
      <button className="text-white bg-slate-700 py-1 px-3 rounded border border-gray-800 transition duration-400 hover:bg-slate-800"
        onClick={logoutHandler}
      >Logout</button>
    </div>
  );
};

export default Navbar;
