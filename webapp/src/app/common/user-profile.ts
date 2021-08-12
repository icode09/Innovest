export class UserProfile {
    constructor(
        public displayName : string,
        public username : string,
        public domains : string[],
        public bio : string
    ){}
}
