// app/routes/_index.jsx
import { Page, Layout, Card, Text } from "@shopify/polaris";

export const loader = async () => {
  return null;
};

export default function Index() {
  return (
    <Page title="NYDHI Loyalty App">
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="headingMd" as="h2">
              Welcome to NYDHI Loyalty 🚀
            </Text>
            <p>Your development app is running successfully on Shopify.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
