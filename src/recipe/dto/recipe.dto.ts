export class RecipeDTO {
  readonly name: string;
  readonly summary: string;
  readonly image?: string;
  readonly punctuation?: number;
  readonly healthScore?: number;
  readonly steps?: Array<string>;
  readonly dishTypes?: Array<string>;
  readonly types: Array<string>;
}
