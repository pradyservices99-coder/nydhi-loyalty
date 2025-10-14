import { Page, Layout, Card, Text, BlockStack } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import AppLayout from "../components/AppLayout";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <AppLayout>
      <Page title="NYDHI Loyalty Dashboard">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h1">
                  Welcome to NYDHI Loyalty
                </Text>
                <Text>
                  Your loyalty system is now connected to{" "}
                  <strong>browsebuysave.myshopify.com</strong>.
                </Text>
                <Text>
                  Use this dashboard to view customer loyalty points, order-based
                  rewards, and program settings.
                </Text>
                <Text tone="subdued">
                  Next steps: We’ll display points from your Prisma database and
                  live Shopify orders here.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card sectioned>
              <Text variant="headingMd">Quick Links</Text>
              <ul style={{ marginTop: "0.5rem", lineHeight: "1.8" }}>
                <li>
                  <a
                    href="https://admin.shopify.com/store/browsebuysave/orders"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Store Orders
                  </a>
                </li>
                <li>
                  <a
                    href="https://admin.shopify.com/store/browsebuysave/customers"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Customers
                  </a>
                </li>
                <li>
                  <a
                    href="https://prisma.studio"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Prisma Studio
                  </a>
                </li>
              </ul>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}

// Required boundary for Remix + Shopify
export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
