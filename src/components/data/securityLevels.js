export const securityLevels = [
  {
    descriptionLabel: "At least 1 number",
    validator: /.*[0-9].*/
  },
  {
    descriptionLabel: "At least 1 lowercase letter",
    validator: /.*[a-z].*/
  },
  {
    descriptionLabel: "At least 1 uppercase letter",
    validator: /.*[A-Z].*/
  },
  {
    descriptionLabel: "At least 1 special character: ! @ # $ % ^ & * ( )",
    validator: /.*[!@#$%^&*()].*/
  },
  {
    descriptionLabel: "At least 12 characters in length",
    validator: /.{12,50}/
  }
];
