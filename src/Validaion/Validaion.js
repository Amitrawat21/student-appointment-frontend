export default function validation(values, isSignup) {
  const errors = {};
  const email_pattern = /^[^\s@]+@gmail\.com$/;
  const password_pattern = /^.{6,}$/;
  const phone_pattern = /^\d{10}$/; // Example pattern for 10-digit phone number

  if (isSignup) {
    if (values.name === "") {
      errors.name = "Please enter name";
    }

    if (values.phone === "") {
      errors.phone = "Please enter phone number";
    } else if (!phone_pattern.test(values.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!values.role || values.role === "Select") {
      errors.role = "Please select role";
    }

    if (!values.institute || values.institute === "Select") {
      errors.institute = "Please select institute";
    }
  }

  if (values.email === "") {
    errors.email = "Please enter email";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (values.password === "") {
    errors.password = "Please enter password";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password should be at least 6 characters";
  }

  return errors;
}
