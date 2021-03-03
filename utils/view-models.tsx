import { ShowFIRScheduleResponse } from "../lib/db-public";

export interface ShowScheduleViewModel {
  data: ShowFIRScheduleResponse;
  thumbnailUrl?: string;
  photoUrl?: string;
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
