/**
 * Password validation regex
 * Requires: at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validates a password against the regex
 */
export function validatePassword(password: string): boolean {
  return PASSWORD_REGEX.test(password);
}
