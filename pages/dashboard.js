import Layout from "../src/ui-components/layout";
import Dashboard from "../src/Pages/dashboard";
import PrivateContent from "src/components/PrivateContent";

export default () => (
    <PrivateContent>
        <Layout>
            <Dashboard />
        </Layout>
    </PrivateContent>
)