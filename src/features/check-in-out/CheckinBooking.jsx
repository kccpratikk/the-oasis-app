import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const { isLoading: isSettingsLoading, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optinalBreakFastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optinalBreakFastPrice,
          totalPrice: totalPrice + optinalBreakFastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid((confirm) => !confirm);
            }}
            id="breakfast"
          >
            Want to include BreakFast for{" "}
            {formatCurrency(optinalBreakFastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(
                totalPrice + optinalBreakFastPrice
              )} ( ${formatCurrency(totalPrice)} + ${formatCurrency(
                optinalBreakFastPrice
              )} )`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          variation="primary"
          disabled={!confirmPaid || isCheckingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
