import { SidebarLink } from './SidebarLink'

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-indigo-700 text-white">
      <ul className="flex flex-col">
        {SidebarLink.map((value, key) => (
          <li
            key={key}
            className={`p-4 flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 ${
              window.location.pathname === value.link ? "bg-indigo-900" : ""
            }`}
            onClick={() => { window.location.pathname = value.link }}
          >
            <div className="mr-4">{value.icon}</div>
            <div>{value.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;