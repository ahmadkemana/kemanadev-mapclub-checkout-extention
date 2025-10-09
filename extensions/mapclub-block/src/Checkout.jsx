import {
  reactExtension, 
  BlockStack, 
  Text, 
  useCustomer,
  InlineStack,
  Link,
  Icon,
  useAppMetafields,
  useApi,
  useShop
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const {api} = useApi();
  const shop = useShop();
  const accountPageLoginURL = `https://${shop.myshopifyDomain}/account/login`;
  const accountPageURL = `https://${shop.myshopifyDomain}/account`;
  const customer = useCustomer();
  const appMetafields = useAppMetafields()
  const customerMetafield = appMetafields.find(
  (item) =>
    item?.target?.type === "customer" &&
    item?.metafield?.namespace === "custom" &&
    item?.metafield?.key === "mapclub_member_code"
);;
  // 🎉 Access the metafield directly - no API calls needed!
  const memberCode = customerMetafield?.metafield?.value;
   
  console.log('appMetafields' , appMetafields)
  // Show sign-in message if customer is not logged in
  if (!customer) { 
    return (
      <BlockStack
        padding={['base', 'base', 'base', 'base']}
        background="subdued"
        cornerRadius="base"
        border={['base', 'solid', 'base']}
        spacing="tight"
      >
        <InlineStack spacing="tight" blockAlignment="center">
          <Icon source="info" size="small" />
          <Text size="medium" emphasis="bold">MAPCLUB</Text>
        </InlineStack>
        <BlockStack spacing="extraTight">
          <Text size="small" appearance="subdued">
            Sign in to use your MAPCLUB points.
          </Text>
        </BlockStack>
      </BlockStack>
    );
  }

  // Extract customer information
  const customerName = customer.firstName && customer.lastName 
    ? `${customer.firstName} ${customer.lastName}`
    : customer.email;
  
  const availablePoints = 0; // Replace with actual points logic

  return (
    <BlockStack
      padding={['base', 'base', 'base', 'base']}
      background="subdued"
      cornerRadius="base"
      border={['base', 'solid', 'base']}
      spacing="tight"
    >
      {/* Header */}
      <InlineStack spacing="tight" blockAlignment="center">
        <Icon source="info" size="small" />
        <Text size="medium" emphasis="bold">MAPCLUB</Text>
      </InlineStack>

      {/* Customer name */}
      <Text size="medium" emphasis="bold">
        {customerName}
      </Text>

      {/* Available points */}
      <Text size="small" appearance="subdued">
        Available Point: {availablePoints}
      </Text>
      {/* Account management */}
      <BlockStack spacing="extraTight">
        <Text size="small" appearance="subdued">
          {memberCode && memberCode !== ""
            ? "Change the MAPCLUB Account if it isn't yours"
            : "Link your MAPCLUB account and receive a bonus point when you check out this product!"}
        </Text>
        <Text size="small" appearance="subdued">
          {memberCode && memberCode !== "" ? (
            <>
              Unlink?{" "}
              <Link to={accountPageLoginURL} >
                Click here
              </Link>
            </>
          ) : (
            <Link to={accountPageURL}>
              Click here
            </Link>
          )}
        </Text>
      </BlockStack>
    </BlockStack>
  );
}