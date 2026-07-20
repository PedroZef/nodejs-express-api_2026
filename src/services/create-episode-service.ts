import { PodcastModel } from "../models/podcast-model";
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcast, repositoryPodcastCreate } from "../repositories/podcasts-repository";
import { StatusCode } from "../utils/status-code";

export const serviceCreateEpisode = async (
  podcast: PodcastModel
): Promise<PodcastTransferModel> => {
  let responseFormat: PodcastTransferModel = {
    statusCode: StatusCode.BadRequest,
    body: [],
  };

  // Verifica se o body tem os dados básicos
  if (!podcast.podcastName || !podcast.videoId || !podcast.episode) {
    responseFormat.statusCode = StatusCode.BadRequest;
    responseFormat.body = { message: "Dados incompletos." };
    return responseFormat;
  }

  // Verifica se o videoId já existe
  const existingPodcasts = await repositoryPodcast();
  const alreadyExists = existingPodcasts.some(
    (p) => p.videoId === podcast.videoId
  );

  if (alreadyExists) {
    responseFormat.statusCode = StatusCode.BadRequest;
    responseFormat.body = { message: "O episódio já existe (videoId duplicado)." };
    return responseFormat;
  }

  // Cria
  const created = await repositoryPodcastCreate(podcast);

  responseFormat.statusCode = StatusCode.Created;
  responseFormat.body = created;

  return responseFormat;
};
