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
import {
  FIRInstructionSet,
  Instruction,
  InstructionBlock,
} from "@superfitapp/superfitjs";
import InstructionBuilder from "./InstructionBuilder";

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

  instructionSetViewModel?: InstructionSetViewModel;
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
      youtubeLink = `https://www.youtube.com/embed/${youtubeId}?autohide=1&showinfo=1&controls=1`;
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

  var instructionSetViewModel: InstructionSetViewModel | null = null;

  if (data.instructionSet) {
    try {
      instructionSetViewModel = createInstructionSetViewModel(
        data.instructionSet
      );
    } catch (error) {
      throw error;
    }
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
    instructionSetViewModel: instructionSetViewModel,
  };
}

interface InstructionSetViewModel {
  orderedInstructionBlocks?: InstructionBlock[];
  instructionsBlockMap?: { [blockId: string]: InstructionViewModel[] };
}

export function createInstructionSetViewModel(
  instructionSet: FIRInstructionSet
): InstructionSetViewModel {
  var instructionsBlockMap: { [blockId: string]: InstructionViewModel[] } = {};

  if (
    instructionSet &&
    instructionSet.instructionBlocks &&
    Object.keys(instructionSet.instructionBlocks).length > 0
  ) {
    var instructionBlocks = [];
    for (var key in instructionSet.instructionBlocks) {
      let instructionBlock = instructionSet.instructionBlocks[key];
      instructionsBlockMap[
        instructionBlock.uniqueId
      ] = sortInstructionsForBlock(instructionBlock);
      instructionBlocks.push(instructionBlock);
    }

    const orderedInstructionBlocks = instructionBlocks.sort(
      (x, y) => x.order - y.order
    );

    return {
      orderedInstructionBlocks: orderedInstructionBlocks,
      instructionsBlockMap: instructionsBlockMap,
    };
  } else {
    return {
      orderedInstructionBlocks: null,
      instructionsBlockMap: null,
    };
  }
}

function sortInstructionsForBlock(
  block: InstructionBlock
): InstructionViewModel[] {
  var instructions: InstructionViewModel[] = [];
  for (var key in block.instructions) {
    const instruction = block.instructions[key];

    // fuse over here.
    if (block.groupInstruction) {
      const fusion: Instruction = {
        uniqueId: instruction.uniqueId,
        order: instruction.order,
        prompt: instruction.prompt || block.groupInstruction.prompt,
        exercise: instruction.exercise || block.groupInstruction.exercise,
        primaryInput:
          instruction.primaryInput || block.groupInstruction.primaryInput,
        reps: instruction.reps || block.groupInstruction.reps,
        weight: instruction.weight || block.groupInstruction.weight,
        duration: instruction.duration || block.groupInstruction.duration,
        distance: instruction.distance || block.groupInstruction.distance,
        massUnit: instruction.massUnit || block.groupInstruction.massUnit,
        distanceUnit:
          instruction.distanceUnit || block.groupInstruction.distanceUnit,
        durationUnit:
          instruction.durationUnit || block.groupInstruction.durationUnit,
        displayedDistanceUnit:
          instruction.displayedDistanceUnit ||
          block.groupInstruction.displayedDistanceUnit,
      };

      for (var key in fusion) {
        const value = fusion[key];
        if (value == undefined) {
          // react requires null?
          fusion[key] = null;
        }
      }

      let vm = createInstructionViewModel(fusion);
      instructions.push(vm);
    } else {
      let vm = createInstructionViewModel(instruction);
      instructions.push(vm);
    }
  }

  let orderedInstructions = instructions.sort(
    (x, y) => x.instruction.order - y.instruction.order
  );

  return orderedInstructions;
}

interface InstructionViewModel {
  instruction: Instruction;
  thumbnailUrl?: string;
  youtubeUrl?: string;
  muxUrl?: string;
  masterUrl?: string;
  instructionPrompt: string;
}

export function createInstructionViewModel(
  instruction: Instruction
): InstructionViewModel {
  var thumbnailUrl: string;
  var youtubeUrl: string;
  var muxUrl: string;
  var masterUrl: string;
  var instructionPrompt: string;
  let exercise = instruction.exercise;

  youtubeUrl = exercise?.youtubeLink;
  thumbnailUrl = thumbnailUrl;
  instructionPrompt = InstructionBuilder.intensityString(instruction);

  if (exercise?.youtubeLink) {
    const youtubeId = getQueryString("v", exercise.youtubeLink);
    thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  }

  let customVideo = exercise.customVideo;

  if (customVideo) {
    if (customVideo && exercise?.customVideo?.muxPlaybackId) {
      thumbnailUrl = `https://image.mux.com/${exercise.customVideo.muxPlaybackId}/animated.gif?fps=2&width=120`;
      muxUrl = `https://stream.mux.com/${exercise.customVideo.muxPlaybackId}.m3u8`;
    }

    if (customVideo && exercise?.customVideo?.masterUrl) {
      masterUrl = exercise.customVideo.masterUrl;
    }
  }

  const vm: InstructionViewModel = {
    instruction: instruction,
    thumbnailUrl: thumbnailUrl,
    youtubeUrl: youtubeUrl,
    muxUrl: muxUrl,
    masterUrl: masterUrl,
    instructionPrompt: instructionPrompt,
  };

  for (var key in vm) {
    const value = vm[key];
    if (value == undefined) {
      // react requires null?
      vm[key] = null;
    }
  }

  return vm;
}
