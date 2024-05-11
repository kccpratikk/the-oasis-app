import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const { updateSetting, isUpdating } = useUpdateSetting();
  const { isLoading, settings = {} } = useSettings();
  if (isLoading) return <Spinner />;

  const handleUpdate = (e) => {
    const value = e.target.value;

    if (!value) return;

    if (settings[e.target.id].toString() === value) return;

    console.log(typeof settings[e.target.id]);
    updateSetting({ [e.target.id]: value });
  };

  return (
    <Form>
      <FormRow>
        <Label htmlFor="min-nights">Minimum nights/booking</Label>
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={settings["minBookingLength"]}
          onBlur={(e) => handleUpdate(e)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-nights">max-nights/booking</Label>
        <Input
          disabled={isUpdating}
          type="number"
          id="maxBookingLength"
          defaultValue={settings["maxBookingLength"]}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="max-guests">max-guests/booking</Label>
        <Input
          disabled={isUpdating}
          type="number"
          id="maxGuestsPerBookings"
          defaultValue={settings["maxGuestsPerBookings"]}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="breakfast-price">breakfast-price</Label>
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfastPrice"
          defaultValue={settings["breakfastPrice"]}
          onBlur={(e) => handleUpdate(e)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
