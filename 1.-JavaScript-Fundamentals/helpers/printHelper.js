export function printAge(age) {
  console.log(age);
}

// Classes
//class created and exported to lesson 9
export class CustomerDetails {
  /**
   * This method prints the first name
   * @param {string} firstName
   */
  printFirstName(firstName) {
    console.log(firstName);
  }

  /**
   * This method prints the last name
   * @param {string} lastName
   */
  printLastName(lastName) {
    console.log(lastName);
  }
}

export const customerDetails = new CustomerDetails();
