import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandPage from "@/pages/bands/[bandId]";

it("displays correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandPage band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();

  const description = screen.getByText(
    /blistering world music, supported by a moody water glass orchestra/i
  );
  expect(description).toBeInTheDocument();

  const image = screen.getByRole("img", { name: "band photo" });
  expect(image).toBeInTheDocument();

  const author = screen.getByRole("link", { name: /Adina Voicu/i });
  expect(author).toBeInTheDocument();
});

it("displays error message", () => {
  render(<BandPage band={null} error="Something is wrong!" />);

  const error = screen.getByRole("heading", {
    name: /something is wrong!/i,
  });
  expect(error).toBeInTheDocument();
});
