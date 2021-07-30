export class Challenge {
    
        constructor(
            public challengeId : string,
            public challengerId :string,
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
            public imageName:String,
            public documentUrl:String,
            public rewardPrize: number,
            public challengeImage :number[],
            public registrations: number,
            public views: number
            
        
        ){}
}
