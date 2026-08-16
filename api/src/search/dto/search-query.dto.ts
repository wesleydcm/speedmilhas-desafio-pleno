import { IsString, Matches } from "class-validator";

export class SearchQueryDto {
  @IsString()
  @Matches(/^[A-Z]{3}$/)
  origin: string;

  @IsString()
  @Matches(/^[A-Z]{3}$/)
  destination: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date must be in YYYY-MM-DD format",
  })
  date: string;
}
