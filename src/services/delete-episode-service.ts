import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcastDelete } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceDeleteEpisode = async (
  videoId: string
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

  const isDeleted = await repositoryPodcastDelete(videoId);

  if (!isDeleted) {
    responseFormat.statusCode = StatusCode.NotFound;
    responseFormat.body = { message: "Podcast não encontrado." };
    return responseFormat;
  }

  responseFormat.statusCode = StatusCode.OK;
  responseFormat.body = { message: "Podcast deletado com sucesso." };

  return responseFormat;
};
