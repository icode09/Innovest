export class Challenge {
  constructor(
    public challengeId: string,
    public challengerName: string,
    public challengeName: string,
    public description: string,
    public rules: string,
    public abstraction: string,
    public domain: string[],
    public domains: string[],
    public startDate: Date,
    public endDate: Date,
    public registrationType: string,
    public participationType: string,
    public paid: boolean,
    public rewardPrize: number,
    public challengeImage: string,
    public imageName: string,
    public documentUrl: String,
    public registrations: number,
    public views: number
  ) {}
}
