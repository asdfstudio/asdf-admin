import Dashboard from "./dashboard";
import PrivateContent from "src/components/PrivateContent";

export default function Home() {

  return (
    <PrivateContent>
        <Dashboard />
    </PrivateContent>
  );
}