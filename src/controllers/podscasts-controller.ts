import { Request, Response } from "express";

import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceCreateEpisode } from "../services/create-episode-service";
import { serviceUpdateEpisode } from "../services/update-episode-service";
import { serviceDeleteEpisode } from "../services/delete-episode-service";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

export const getListEpisodes = async (
  req: Request,
  res: Response
) => {
  const content: PodcastTransferModel = await serviceListEpisodes();
  res.status(content.statusCode).json(content.body);
};

export const getFilterEpisodes = async (
  req: Request,
  res: Response
) => {
  const podcastName = req.query.podcastName as string | undefined;
  const content: PodcastTransferModel = await serviceFilterEpisodes(podcastName);
  res.status(content.statusCode).json(content.body);
};

export const postEpisode = async (
  req: Request,
  res: Response
) => {
  const content: PodcastTransferModel = await serviceCreateEpisode(req.body);
  res.status(content.statusCode).json(content.body);
};

export const patchEpisode = async (
  req: Request,
  res: Response
) => {
  const videoId = req.params.videoId as string;
  const content: PodcastTransferModel = await serviceUpdateEpisode(videoId, req.body);
  res.status(content.statusCode).json(content.body);
};

export const deleteEpisode = async (
  req: Request,
  res: Response
) => {
  const videoId = req.params.videoId as string;
  const content: PodcastTransferModel = await serviceDeleteEpisode(videoId);
  res.status(content.statusCode).json(content.body);
};
