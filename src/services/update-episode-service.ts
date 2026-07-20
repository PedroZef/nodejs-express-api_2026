import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcastUpdate } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceUpdateEpisode = async (
  videoId: string,
  updatedData: Partial<PodcastModel>
): Promise<PodcastTransferModel> => {
  let responseFormat: PodcastTransferModel = {
    statusCode: StatusCode.BadRequest,
    body: [],
  };

  if (!videoId) {
    responseFormat.statusCode = StatusCode.BadRequest;
    responseFormat.body = { message: "O videoId é obrigatório." };
    return responseFormat;
  }

  const updatedPodcast = await repositoryPodcastUpdate(videoId, updatedData);

  if (!updatedPodcast) {
    responseFormat.statusCode = StatusCode.NotFound;
    responseFormat.body = { message: "Podcast não encontrado." };
    return responseFormat;
  }

  responseFormat.statusCode = StatusCode.OK;
  responseFormat.body = updatedPodcast;

  return responseFormat;
};
