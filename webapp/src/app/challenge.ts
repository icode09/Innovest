export class Challenge {
    
        constructor(
            public challengeName : string,
            public challengeDesc :string,
            public challengeDom :string,
            public challengeStartDT : Date,
            public challengeEndDT :Date,
            public registration_type : string,
            public participationType :string
        
        ){}
}
