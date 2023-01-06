import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

it("displays reservations and 'purchase more' button when reservations exists", async () => {
  render(<UserReservations userId={1} />);

  const purchaseButton = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });
  expect(purchaseButton).toBeInTheDocument();
});

it("displays no reservations and 'purchase' button when no reservations exist", async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(purchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.queryByRole("heading", {
    name: /your tickets/i,
  });
  expect(ticketsHeading).not.toBeInTheDocument();
});
