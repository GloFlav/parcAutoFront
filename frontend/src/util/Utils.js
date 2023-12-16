/*regex email  */
const validEmailRegex = "^([\\w.-]{3,25})+@+([\\w.-]{2,20})+\\.([a-z]{2,3})$";
export const REGEX_EMAIL = new RegExp(validEmailRegex, "i");
/**regex password  */
const validPasswordRegex = "^.{3,20}$";/**au moins 6 caracteres et au plus 2  caracteres */
export const REGEX_PASSWORD = new RegExp(validPasswordRegex, "i");