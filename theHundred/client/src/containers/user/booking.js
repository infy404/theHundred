/**
 * Booking page calls in dynamic form with the fields
 * If Booking confirmed, a timeslot should be updated in the end of Admin Dashboard.
 * Users can edit / cancel their booking if they so wish.
 * Online booking only supports booking for an individual for a specific time or a day only.
 * Further booking to be done physically only.
 * 
 * 
 */

import DynamicForm from "../../components/forms/dynamicForm";

const Booking = () =>
{
    const bookingFields = [
        
      ];

      <DynamicForm 
        formFields={bookingFields}
        buttonName={"Book Now"} 
      />


}

export default Booking


