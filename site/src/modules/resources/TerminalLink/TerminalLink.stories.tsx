import type { Meta, StoryObj } from "@storybook/react";
import { MockWorkspace } from "testHelpers/entities";
import { TerminalLink } from "./TerminalLink";

const meta: Meta<typeof TerminalLink> = {
  title: "modules/resources/TerminalLink",
  component: TerminalLink,
};

export default meta;
type Story = StoryObj<typeof TerminalLink>;

const Example: Story = {
  args: {
    workspaceName: MockWorkspace.name,
  },
};

export { Example as TerminalLink };
