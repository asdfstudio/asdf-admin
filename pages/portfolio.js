import Layout from "../src/ui-components/layout";
import Portfolio from "../src/Pages/portfolio";
import PrivateContent from "src/components/PrivateContent";

export default () => {
    return (
        <PrivateContent>
            <Layout>
                <Portfolio />
            </Layout>
        </PrivateContent>
    );
}