import TopBar from "../component/topBar";
import '@/public/dashboard_icon.svg'
import Menu from "../ui/menu";
import { MdDashboard } from "react-icons/md";



export default function Home() {

  const items = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Setting', href: '/setting' },
    { title: 'Login', href: '/login' }
  ]



  return (
    <div className="flex flex-col h-screen">

      <TopBar>
        <Menu items={items} />
      </TopBar>
      <div className="flex flex-1 justify-center items-center">
        <MdDashboard className="w-50 h-50 text-primary/30" />
      </div>
    </div>
  );
}
