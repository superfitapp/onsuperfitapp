import {
  ShowFIRActivityResponse,
  ShowFIRScheduleResponse,
} from "../lib/db-public";
import {
  getPhotoUrl,
  getQueryString,
  getThumbnailUrl,
  hexColor,
  hexToRGB,
  isDark,
} from "@/utils/helpers";

export interface ShowScheduleViewModel {
  data: ShowFIRScheduleResponse;
  thumbnailUrl?: string;
  photoUrl?: string;
}

export interface ActivityViewModel {
  id?: string;
  scheduleId?: string;
  thumbnailUrl?: string;
  photoUrl?: string;
  scheduledDateTimestamp?: number;
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
  videoThumbnailUrl?: string;

  scheduleTitle: string;
  schedulePhotoUrl?: string;
  scheduleOwnerDisplayName: string;
}

export function createShowScheduleViewModel(
  data: ShowFIRScheduleResponse
): ShowScheduleViewModel {
  var vm: ShowScheduleViewModel = {
    data: data,
  };

  const photo = data?.schedule?.photo;
  vm.thumbnailUrl = getThumbnailUrl(photo);
  vm.photoUrl = getPhotoUrl(photo);

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

  var scheduleThumbnailUrl: string | null = null;
  var scheduleOwnerDisplayName: string | null = data.schedule?.ownerDisplayName;

  if (data.activity.photo) {
    thumbnailUrl = getThumbnailUrl(data.activity.photo);
    photoUrl = getPhotoUrl(data.activity.photo);
  }

  if (data.schedule.photo) {
    scheduleThumbnailUrl = getThumbnailUrl(data.schedule.photo);
  }

  var videoThumbnailUrl = null;
  if (data.activity.youtubeLink) {
    const youtubeId = getQueryString("v", data.activity.youtubeLink);
    videoThumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  } else if (
    data.activity.customVideo &&
    data.activity.customVideo?.muxPlaybackId
  ) {
    videoThumbnailUrl = `https://image.mux.com/${data.activity.customVideo?.muxPlaybackId}/animated.gif?fps=2&width=120`;
  }

  return {
    id: data.activity.id || null,
    scheduleId: data.activity.scheduleInfo.id,
    color: primaryColor,
    colorGradient: hexToRGB(primaryColor, 0.75),
    textColor: isDark(primaryColor) ? "white" : "#303030",
    activityType: data.activity.type,
    title: data.activity.title,
    scheduledDateTimestamp:
      data.activity.scheduledDate?._seconds * 1000 || null,
    customVideoUrl: data.activity?.customVideo?.masterUrl || null,
    description: data.activity.description,
    customMuxUrl: data.activity.customVideo?.muxPlaybackId
      ? `https://stream.mux.com/${data.activity.customVideo?.muxPlaybackId}.m3u8`
      : null,
    youtubeLink: youtubeLink,
    allDay: data.activity.allDay,
    photoUrl: photoUrl,
    thumbnailUrl: thumbnailUrl,
    videoThumbnailUrl: videoThumbnailUrl,
    scheduleTitle: data.schedule.title,
    schedulePhotoUrl: scheduleThumbnailUrl,
    scheduleOwnerDisplayName: scheduleOwnerDisplayName,
  };
}
