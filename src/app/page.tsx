import Cursor from "@/components/Cursor";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import ToolBox from "@/components/ToolBox";

export default function Home() {
  return (
    <main>
      <ToolBox />
      <Sidebar />
      <Main />
    </main>
  );
}
