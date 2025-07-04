import { validListing } from "./listing";
import { validUsername } from "./username";

class ValidationResult {
    constructor(
        readonly errors: string[],
    ) {}

    get ok() {
        return this.errors.length === 0;
    }
}

const createValidator = <T>(validationSource: (arg: T) => Generator<string, void, void>) =>
    (arg: T) => new ValidationResult([...validationSource(arg)]);

export const validate = {
    listing: createValidator(validListing),
    username: createValidator(validUsername),
};