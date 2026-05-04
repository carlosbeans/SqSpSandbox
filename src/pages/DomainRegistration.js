import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton } from "@sqs/rosetta-elements";
import { Text } from "@sqs/rosetta-primitives";
import { Button } from "@sqs/rosetta-primitives";
import { Flex } from "@sqs/rosetta-primitives";
import { Box } from "@sqs/rosetta-primitives";
import { TextField } from "@sqs/rosetta-elements";
import { TextLink } from "@sqs/rosetta-elements";
import { Tabs } from "@sqs/rosetta-elements";
import { Dropdown } from "@sqs/rosetta-compositions";
import { Grid, Stack } from "@sqs/rosetta-elements";

export default function DomainRegistration() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("registrant");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");

  return (
    <Stack space={6} px={6} pb={6}>
      <BackButton
        label="Back"
        onClick={() => navigate(`/domains/${domainId}`)}
      />

      <Stack space={2}>
        <Text.Title>Registrant information</Text.Title>
        <Text.Body color="gray.300">
          Enter information for the designated domain registrant. If the
          registrant is an organization, enter its name under the Organization
          field. Please note: Information in the organization field is publicly
          available.{" "}
          <TextLink href="#">Learn more</TextLink>
        </Text.Body>
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        options={[
          { label: "Registrant", value: "registrant" },
          { label: "Billing", value: "billing" },
          { label: "Tech", value: "tech" },
        ]}
      />

      {/* Contact section */}
      <Stack space={4}>
        <Text.Subtitle>Contact</Text.Subtitle>

        <Grid.Container gridConstraint={12} margin={0}>
          <Grid.Item columns={[12, 6]}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid.Item>
          <Grid.Item columns={[12, 6]}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid.Item>
        </Grid.Container>

        <TextField
          label="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          inputProps={{ placeholder: "Org name" }}
        />

        <Grid.Container gridConstraint={12} margin={0}>
          <Grid.Item columns={[12, 6]}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid.Item>
          <Grid.Item columns={[12, 6]}>
            <TextField
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ placeholder: "(555) 555-5555" }}
            />
          </Grid.Item>
        </Grid.Container>
      </Stack>

      {/* Address section */}
      <Stack space={4}>
        <Text.Subtitle>Address</Text.Subtitle>

        <TextField
          label="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />

        <TextField
          label="Apt/Suite (Optional)"
          value={aptSuite}
          onChange={(e) => setAptSuite(e.target.value)}
          inputProps={{ placeholder: "Apt/Suite" }}
        />

        <Grid.Container gridConstraint={12} margin={0}>
          <Grid.Item columns={[12, 6]}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid.Item>
          <Grid.Item columns={[12, 6]}>
            <Dropdown
              label="State"
              value={state}
              onChange={(val) => setState(val)}
              options={[
                { label: "California", value: "CA" },
                { label: "New York", value: "NY" },
                { label: "Texas", value: "TX" },
                { label: "Florida", value: "FL" },
                { label: "Oregon", value: "OR" },
                { label: "Washington", value: "WA" },
                { label: "Colorado", value: "CO" },
                { label: "Georgia", value: "GA" },
                { label: "Illinois", value: "IL" },
                { label: "Massachusetts", value: "MA" },
                { label: "Minnesota", value: "MN" },
                { label: "Tennessee", value: "TN" },
                { label: "Virginia", value: "VA" },
              ]}
            />
          </Grid.Item>
        </Grid.Container>

        <Grid.Container gridConstraint={12} margin={0}>
          <Grid.Item columns={[12, 4]}>
            <TextField
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Grid.Item>
          <Grid.Item columns={[12, 8]}>
            <Dropdown
              label="Country"
              value={country}
              onChange={(val) => setCountry(val)}
              options={[
                { label: "United States of America", value: "US" },
                { label: "Canada", value: "CA" },
                { label: "United Kingdom", value: "UK" },
                { label: "Australia", value: "AU" },
              ]}
            />
          </Grid.Item>
        </Grid.Container>
      </Stack>

      {/* Save button */}
      <Flex justifyContent="flex-end">
        <Button.Primary>Save</Button.Primary>
      </Flex>
    </Stack>
  );
}
