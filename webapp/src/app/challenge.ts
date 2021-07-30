export class Challenge {
    
        constructor(
            public challengeName : string,
            public description :string,
            public domain :string,
            public startDate : Date,
            public endDate :Date,
            public registrationType : string,
            public participationType :string,
            public paid :boolean,
            public rules :String,
            public abstraction: String,
            
        
        ){}
}
