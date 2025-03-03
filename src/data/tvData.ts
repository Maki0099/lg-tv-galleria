
import { TvModel } from "./models/TvModel";
import { oledTvs } from "./tvs/oledTvs";
import { qnedTvs } from "./tvs/qnedTvs";
import { nanoCellTvs } from "./tvs/nanoCellTvs";
import { ledTvs } from "./tvs/ledTvs";

// Combine all TV arrays
export const tvs: TvModel[] = [
  ...oledTvs,
  ...qnedTvs,
  ...nanoCellTvs,
  ...ledTvs
];

// Re-export the TvModel type
export type { TvModel } from "./models/TvModel";
