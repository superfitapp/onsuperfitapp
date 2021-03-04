import {
  ShowFIRActivityResponse,
  ShowFIRScheduleResponse,
} from "../lib/db-public";
import { getQueryString, hexColor, hexToRGB, isDark } from "@/utils/Helpers";

export interface ShowScheduleViewModel {
  data: ShowFIRScheduleResponse;
  thumbnailUrl?: string;
  photoUrl?: string;
}

export interface ActivityViewModel {
  // id: string;
  thumbnailUrl?: string;
  photoUrl?: string;
  scheduledDateTimestamp: number;
  description?: string;
  title: string;
  allDay?: boolean;
  customMuxUrl?: string;
  customVideoUrl?: string;
  youtubeLink?: string;

  color: string;
  colorGradient: string;
  textColor: string;
  activityType: string;
}

export function createShowScheduleViewModel(
  data: ShowFIRScheduleResponse
): ShowScheduleViewModel {
  var vm: ShowScheduleViewModel = {
    data: data,
  };

  const photo = data.schedule.photo;
  if (photo) {
    switch (photo.type) {
      case "custom":
        vm.thumbnailUrl = photo.customPhotoUrl;
        vm.photoUrl = photo.customPhotoUrl;
        break;
      case "unsplash":
        vm.thumbnailUrl = photo.unsplashThumbUrl;
        vm.photoUrl = photo.unsplashRegularUrl;
        break;
    }
  }
  return vm;
}

export function createShowActivityViewModel(
  data: ShowFIRActivityResponse
): ActivityViewModel {
  let primaryColor = hexColor(data.activity.scheduleInfo.color || "#303030");

  var youtubeLink: string | null = null;
  if (data.activity.youtubeLink) {
    const youtubeId = getQueryString("v", data.activity.youtubeLink);
    if (youtubeId) {
      this.youtubeLink = `https://www.youtube.com/embed/${youtubeId}?autohide=1&showinfo=1&controls=1`;
    }
  }

  var thumbnailUrl: string | null = null;
  var photoUrl: string | null = null;

  if (data.activity.photo) {
    switch (data.activity.photo.type) {
      case "custom":
        thumbnailUrl = data.activity.photo?.customPhotoUrl;
        photoUrl = data.activity.photo?.customPhotoUrl;
        break;
      case "unsplash":
        thumbnailUrl = data.activity.photo?.unsplashThumbUrl;
        photoUrl = data.activity.photo?.unsplashRegularUrl;
        break;
    }
  }

  return {
    color: primaryColor,
    colorGradient: hexToRGB(primaryColor, 0.75),
    textColor: isDark(primaryColor) ? "white" : "#303030",
    activityType: data.activity.type,
    title: data.activity.title,
    scheduledDateTimestamp: data.activity.scheduledDate?._seconds * 1000,
    customVideoUrl: data.activity?.customVideo?.masterUrl || null,
    description: data.activity.description,
    customMuxUrl: data.activity.customVideo?.muxPlaybackId
      ? `https://stream.mux.com/${data.activity.customVideo?.muxPlaybackId}.m3u8`
      : null,
    youtubeLink: youtubeLink,
    allDay: data.activity.allDay,
    photoUrl: photoUrl,
    thumbnailUrl: thumbnailUrl,
  };
}
