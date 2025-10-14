import { AppProvider, Frame, Navigation, TopBar } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useNavigate } from "react-router-dom";

export default function AppLayout({ children }) {
  const navigate = useNavigate();

  // Minimal top bar
  const topBarMarkup = <TopBar showNavigationToggle />;

  // Left sidebar navigation
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/app",
            label: "Dashboard",
            onClick: () => navigate("/app"),
          },
          {
            url: "/app/customers",
            label: "Customers",
            onClick: () => navigate("/app/customers"),
          },
          {
            url: "/app/settings",
            label: "Settings",
            onClick: () => navigate("/app/settings"),
          },
        ]}
      />
    </Navigation>
  );

  return (
    <AppProvider i18n={translations}>
      <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
        {children}
      </Frame>
    </AppProvider>
  );
}
