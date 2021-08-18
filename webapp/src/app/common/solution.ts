import { ReviewComments } from "./reviewComment";

export class Solution {
  constructor(
    public solutionId: string,
    public solutionTitle: string,
    public solutionDescription: string,
    public codeUrl: string,
    public documentUrl: string,
    public challengeId: string,
    public solvedBy: string,
    public solutionStatus: string,
    public reviewComments: ReviewComments[]
  ) {}
}
