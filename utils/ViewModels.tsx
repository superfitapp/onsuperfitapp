import { ShowFIRActivityResponse } from "../lib/db-public";
import {
  getPhotoUrl,
  getQueryString,
  getThumbnailUrl,
  hexColor,
  hexToRGB,
  isDark,
} from "@/utils/helpers";
import {
  AccessLevel,
  FIRInstructionSet,
  FIRScheduleMember,
  ScheduleSignUpType,
  Instruction,
  InstructionBlock,
  ShowFIRSchedule,
  StripePrice,
  WebLink,
} from "@superfitapp/superfitjs";
import InstructionBuilder from "./InstructionBuilder";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);
import "dayjs/locale/en"; // import locale
import { isPayingMember } from "./schedule-member";
dayjs.locale("en"); // use locale

export interface ShowScheduleViewModel {
  scheduleId: string;
  scheduleTitle: string;
  thumbnailUrl?: string;
  photoUrl?: string;
  primaryColor: string;
  primaryColorLightRGBA: string;
  secondaryColor: string;
  secondaryColorLightRGBA: string;
  onPrimaryTextColor: string;
  socialIconsColor: string;
  introText?: string;
  backgroundColor: string;
  ownerDisplayName?: string;
  linksBackgroundColor: string;
  links: WebLink[];
  joinSchedulePaidCta?: string;
  joinScheduleFreeCta?: string;
  oneTimePurchaseCta?: string;
  premiumPriceTitle?: string;
  canSignUp: boolean;
  userIsScheduleMember: boolean;
  userIsPaidMember: boolean;
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
  scheduledDateRelative?: string;
  scheduledDateString?: string;
  hasAccess: boolean;
  isTipEnabled: boolean;
  accessOptions: AccessOptionViewModel[];
}

export interface AccessOptionViewModel {
  option: AccessLevel;
  cta: string;
}

export function createShowScheduleViewModel(
  scheduleId: string,
  schedule: ShowFIRSchedule,
  scheduleMember?: FIRScheduleMember
): ShowScheduleViewModel {
  const primaryColor = schedule.color || "#303030";
  const secondaryColor = schedule.secondaryColor || null;
  const secondaryColorLightRGBA = hexToRGB(secondaryColor, 0.15) || null;
  const anyoneCanSignup = schedule.signupType == "anyoneCanSignUp";

  let userIsPaidMember = false;
  const userIsFreeMember = scheduleMember != undefined;

  if (scheduleMember) {
    userIsPaidMember = isPayingMember(scheduleMember);
  }

  const currentPrice: StripePrice | undefined =
    schedule.stripeCurrentOneTimePrice ||
    schedule.stripeCurrentMonthlyPrice ||
    schedule.stripeCurrentYearlyPrice;

  const premiumPriceTitle = currentPrice?.priceDisplayName || null;

  const joinSchedulePaidCta =
    anyoneCanSignup &&
    schedule.enableSubscription &&
    !userIsPaidMember &&
    currentPrice
      ? "Become Premium Member"
      : null;

  const joinScheduleFreeCta =
    anyoneCanSignup &&
    !schedule.payToJoin &&
    !userIsPaidMember &&
    !userIsFreeMember &&
    schedule.signupType == ScheduleSignUpType.anyoneCanSignUp
      ? joinSchedulePaidCta
        ? "Start for Free"
        : "Join for Free"
      : null;

  var links: WebLink[] = [];
  for (var key in schedule.profile?.links) {
    const link = schedule.profile?.links[key];
    links.push(link);
  }

  let vm: ShowScheduleViewModel = {
    scheduleTitle: schedule.title,
    primaryColor: hexColor(primaryColor),
    secondaryColor: secondaryColor,
    primaryColorLightRGBA: hexToRGB(primaryColor, 0.15),
    secondaryColorLightRGBA: secondaryColorLightRGBA,
    onPrimaryTextColor: isDark(primaryColor) ? "white" : "#303030",
    socialIconsColor: hexToRGB(primaryColor, 0.75),
    introText: schedule.profile?.about || null,
    backgroundColor: schedule.profile?.backgroundColor || null,
    linksBackgroundColor: schedule.profile?.linksBackgroundColor || null,
    ownerDisplayName: schedule.ownerDisplayName || null,
    premiumPriceTitle: premiumPriceTitle,
    links: links.sort((x, y) => x.order - y.order),
    joinSchedulePaidCta: joinSchedulePaidCta,
    joinScheduleFreeCta: joinScheduleFreeCta,
    canSignUp: joinSchedulePaidCta != null || joinScheduleFreeCta != null,
    userIsScheduleMember: scheduleMember != undefined || false,
    userIsPaidMember: userIsPaidMember,
    scheduleId: scheduleId,
  };

  const photo = schedule.photo;
  if (photo) {
    vm.thumbnailUrl = getThumbnailUrl(photo);
    vm.photoUrl = getPhotoUrl(photo);
  }

  return vm;
}

export function createShowActivityViewModel(
  data: ShowFIRActivityResponse
): ActivityViewModel | undefined {
  if (!data.activity) {
    return null;
  }

  let primaryColor = hexColor(data.activity?.scheduleInfo?.color || "#303030");

  var youtubeLink: string | null = null;
  if (data?.activity?.youtubeLink) {
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
  if (data.activity?.youtubeLink) {
    const youtubeId = getQueryString("v", data.activity.youtubeLink);
    videoThumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;
  } else if (
    data.activity?.customVideo &&
    data.activity?.customVideo?.muxPlaybackId
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

  const scheduledDateTimestamp =
    data.activity.scheduledDate?._seconds * 1000 || null;
  let scheduledDateString: string | undefined = null;
  let scheduledDateRelative: string | undefined = null;

  if (scheduledDateTimestamp) {
    const scheduledDate = new Date(scheduledDateTimestamp);

    let scheduledDateDayJs = dayjs(scheduledDate);

    scheduledDateString = scheduledDateDayJs.calendar(null, {
      sameDay: data.activity.allDay ? "[Today]" : "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
      nextDay: data.activity.allDay ? "[Tomorrow]" : "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
      nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
      lastDay: data.activity.allDay ? "[Yesterday]" : "[Yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[Last] dddd", // Last week ( Last Monday at 2:30 AM )
      sameElse: "MMMM DD, YYYY", // Everything else ( 7/10/2011 )
    });
    scheduledDateRelative = scheduledDateDayJs.fromNow();
  }

  var accessOptions: AccessOptionViewModel[] = data.accessOptions
  .filter((option)=> {
    // Edge case: if schedule is invite only, do no show members only cta.
    // We should be porting cta logic from iOS to web.
    const scheduleInviteRequired = data.schedule.signupType == ScheduleSignUpType.inviteOnly
    const userIsScheduleMember = data.scheduleMember

    if (option == AccessLevel.members && !userIsScheduleMember && scheduleInviteRequired) {
      return false
    }
    return true
  })
  .map(
    (option) => {
      let cta: string;
      switch (option) {
        case AccessLevel.members:
          cta = "Join Free";
          break;
        case AccessLevel.paidMembers:
          cta = "Unlock Premium Membership";
          break;
        case AccessLevel.oneTimePurchase:
          cta = `${activityActionWord(data.activity.type)} ${
            data.activity.signupConfig.priceAmount / 100
          } ${data.activity.signupConfig.priceCurrency.toUpperCase()}`;
          break;
      }
      let vm: AccessOptionViewModel = {
        option: AccessLevel[option],
        cta: cta,
      };
      return vm;
    }
  );

  const isTipEnabled =
    data.activity.tipConfig?.tipEnabled == true &&
    data.activity.access == AccessLevel.all;

  return {
    id: data.activity.id || null,
    scheduleId: data.activity?.scheduleInfo?.id,
    color: primaryColor,
    colorGradient: hexToRGB(primaryColor, 0.75),
    textColor: isDark(primaryColor) ? "white" : "#303030",
    activityType: data.activity.type,
    title: data.activity.title,
    scheduledDateTimestamp: scheduledDateTimestamp,
    scheduledDateRelative: scheduledDateRelative,
    scheduledDateString: scheduledDateString,
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
    hasAccess: data.hasAccess,
    isTipEnabled: isTipEnabled,
    accessOptions: accessOptions,
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
      instructionsBlockMap[instructionBlock.uniqueId] =
        sortInstructionsForBlock(instructionBlock);
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

function activityActionWord(type: string): string {
  switch (type) {
    case ActivityType.event:
      return "Sign up";
    case ActivityType.workout:
      return "Buy";
    case ActivityType.meeting:
      return "Sign up";
  }
}

enum ActivityType {
  event = "event",
  workout = "workout",
  meeting = "meeting",
}
