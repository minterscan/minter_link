import { Letter, LetterSubject } from './Letter'

export type SetPasswordRequest = {
  password: string;
  passwordRepeat: string;
}

export interface CreatePasswordLetter extends Letter {
  subject: LetterSubject.SetPassword;
  body: SetPasswordRequest;
}
