import { Instruction } from "@superfitapp/superfitjs";

export default class InstructionBuilder {
  static intensityString(instruction: Instruction): string | undefined {
    var prompt = "";

    switch (instruction.primaryInput) {
      case ExerciseInput.Freeform:
        return instruction.prompt;
      case ExerciseInput.Reps:
        if (!instruction.reps) {
          return null;
        }

        let allReps = instruction.reps.split(",").map((x) => `${x}`);
        prompt = `Do ${allReps} reps`;
        break;
      case ExerciseInput.Duration:
        if (!instruction.duration) {
          return null;
        }

        let allDuration = instruction.duration.split(",").map((x) => `${x}`);

        prompt = `Do ${allDuration}${InstructionBuilder.durationUnitString(
          instruction.durationUnit
        )}`;
        break;
      case ExerciseInput.Distance:
        if (!instruction.distance) {
          return null;
        }

        let allDistance = instruction.distance.split(",").map((x) => `${x}`);
        prompt = `Go ${allDistance}${InstructionBuilder.distanceUnitString(
          instruction.distanceUnit
        )}`;
        break;
    }

    if (instruction.weight) {
      let allWeight = instruction.weight.split(",").map((x) => `${x}`);
      prompt += ` with ${allWeight}${InstructionBuilder.massUnitString(
        instruction.massUnit
      )}`;
    }

    return prompt;
  }

  static massUnitString(unit: string): string {
    switch (unit) {
      case MassUnit.Pound:
        return "lb";
      case MassUnit.Kilogram:
        return "kg";
    }
  }

  static distanceUnitString(unit: string): string {
    switch (unit) {
      case DistanceUnit.meters:
        return "m";
      case DistanceUnit.feet:
        return "ft";
      case DistanceUnit.kilometers:
        return "km";
      case DistanceUnit.miles:
        return "mi";
    }
  }

  static durationUnitString(unit: string): string {
    switch (unit) {
      case DurationUnit.minute:
        return "m";
      case DurationUnit.second:
        return "sec";
    }
  }
}

export enum DurationUnit {
  minute = "minute",
  second = "second",
}

export enum DistanceUnit {
  meters = "meters",
  feet = "feet",
  kilometers = "kilometers",
  miles = "miles",
}

export enum ExerciseInput {
  Reps = "reps",
  Weight = "weight",
  Duration = "duration",
  Distance = "distance",
  Freeform = "freeform",
}

export enum MassUnit {
  Pound = "pound",
  Kilogram = "kilogram",
}
