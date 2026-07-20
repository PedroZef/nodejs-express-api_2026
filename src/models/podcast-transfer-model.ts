import { PodcastModel } from "./podcast-model";

export interface PodcastTransferModel {
  statusCode: number;
  body: PodcastModel[] | PodcastModel | { message: string } | any;
}
