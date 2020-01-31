export class ValidationRule {

    pattern     : string;

    constructor(pattern : string) {
        this.pattern = pattern;
    }

    getMessage() : string {
        return `Pattern '${this.pattern}' not respected.`;
    }

}