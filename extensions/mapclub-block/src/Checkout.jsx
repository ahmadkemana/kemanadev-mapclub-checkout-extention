import {
  reactExtension, 
  BlockStack, 
  Text, 
  useCustomer,
  InlineStack,
  Link,
  Icon,
  useExtensionCapability,
  useBuyerJourneyIntercept,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
 const customer = useCustomer();
  const canBlockProgress = useExtensionCapability('block_progress');
  
  // Only show the block if customer is logged in
  if (!customer) { 
    return (
       <BlockStack
      padding={['base', 'base', 'base', 'base']}
      background="subdued"
      cornerRadius="base"
      border={['base', 'solid', 'base']}
      spacing="tight"
    >
      {/* Header with icon and MAPCLUB text */}
      <InlineStack spacing="tight" blockAlignment="center">
        <Icon
          source="info"
          size="small"
        />
        <Text size="medium" emphasis="bold">
          MAPCLUB
        </Text>
      </InlineStack>
      {/* Account management link */}
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

  // Mock available points - you'll need to replace this with actual API call
  const availablePoints = 0; // This should come from your loyalty program API

  return (
    <BlockStack
      padding={['base', 'base', 'base', 'base']}
      background="subdued"
      cornerRadius="base"
      border={['base', 'solid', 'base']}
      spacing="tight"
    >
      {/* Header with icon and MAPCLUB text */}
      <InlineStack spacing="tight" blockAlignment="center">
        <Icon
          source="info"
          size="small"
        />
        <Text size="medium" emphasis="bold">
          MAPCLUB
        </Text>
      </InlineStack>

      {/* Customer name */}
      <Text size="medium" emphasis="bold">
        {customerName}
      </Text>

      {/* Available points */}
      <Text size="small" appearance="subdued">
        Available Point: {availablePoints}
      </Text>

      {/* Account management link */}
      <BlockStack spacing="extraTight">
        <Text size="small" appearance="subdued">
        {customer?.metafields?.custom?.mapclub_member_code !== ""
          ? "Change the MAPCLUB Account if it isn't yours"
          : "Link your MAPCLUB account and receive a bonus point when you check out this product!"}
      </Text>
        <Text size="small" appearance="subdued">
        {customer?.metafields?.custom?.mapclub_member_code !== "" ? (
          <>
            Unlink?{" "}
            <Link url="/account/login" external>
              Click here
            </Link>
          </>
        ) : (
          <Link url="/account" external>
            Click here
          </Link>
        )}
      </Text>
      </BlockStack>
    </BlockStack>
  );
}
