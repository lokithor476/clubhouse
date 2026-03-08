export interface SignInWithEmailOTPFormState {
  inputs: { email: string };
  errors: { email?: string[] };
  success: boolean;
}

export interface VerifyEmailOTPFormState {
  inputs: { email: string; otp: string };
  errors: { otp?: string[] };
  success: boolean;
}
