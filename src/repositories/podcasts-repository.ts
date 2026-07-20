import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
  podcastName?: string
): Promise<PodcastModel[]> => {
  const language = "utf-8";

  const rawData = fs.readFileSync(pathData, language);
  let jsonFile = JSON.parse(rawData);

  if (podcastName) {
    jsonFile = jsonFile.filter(
      (podcast: PodcastModel) => podcast.podcastName === podcastName
    );
  }

  return jsonFile;
};

export const repositoryPodcastCreate = async (
  podcast: PodcastModel
): Promise<PodcastModel> => {
  const language = "utf-8";
  const rawData = fs.readFileSync(pathData, language);
  const jsonFile: PodcastModel[] = JSON.parse(rawData);

  jsonFile.push(podcast);
  fs.writeFileSync(pathData, JSON.stringify(jsonFile, null, 2), language);

  return podcast;
};

export const repositoryPodcastUpdate = async (
  videoId: string,
  updatedData: Partial<PodcastModel>
): Promise<PodcastModel | null> => {
  const language = "utf-8";
  const rawData = fs.readFileSync(pathData, language);
  const jsonFile: PodcastModel[] = JSON.parse(rawData);

  const podcastIndex = jsonFile.findIndex((p) => p.videoId === videoId);
  
  if (podcastIndex === -1) {
    return null;
  }

  const updatedPodcast = { ...jsonFile[podcastIndex], ...updatedData };
  jsonFile[podcastIndex] = updatedPodcast;
  
  fs.writeFileSync(pathData, JSON.stringify(jsonFile, null, 2), language);

  return updatedPodcast;
};

export const repositoryPodcastDelete = async (
  videoId: string
): Promise<boolean> => {
  const language = "utf-8";
  const rawData = fs.readFileSync(pathData, language);
  let jsonFile: PodcastModel[] = JSON.parse(rawData);

  const initialLength = jsonFile.length;
  jsonFile = jsonFile.filter((p) => p.videoId !== videoId);

  if (jsonFile.length === initialLength) {
    return false;
  }

  fs.writeFileSync(pathData, JSON.stringify(jsonFile, null, 2), language);
  return true;
};
