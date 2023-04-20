import axios from "axios";
import PlaySound from "play-sound";
import colors from "./colors";
import { negative, positive } from "./patchResponses";
import previousPatchTimes from "./previousPatchDates";
import { Dota } from "./types";

const player = PlaySound({});
const url = "https://www.dota2.com/datafeed/patchnoteslist";
const LOADING_TIME = 1500;
const TIMELINE_LENGTH = 200;
const testing = process.env.test == "true";
let interval: NodeJS.Timeout;
const existingPatches = 77;

const rn = (num: number): string => new Array(num).fill("\n").join("");
const r = (num: number, letter: string): string =>
  new Array(num).fill(letter).join("");

function fakeLoading(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, LOADING_TIME);
  });
}

async function go(): Promise<void> {
  try {
    process.stdout.write(colors.ClearConsole);
    displayTimeline();

    console.log(colors.FgRed, rn(18) + " PATCH STATUS: LOADING");

    const res = await Promise.all([axios.get(url), fakeLoading()]);
    const json = res[0].data as Dota;

    process.stdout.write(colors.ClearConsole);
    displayTimeline();
    const patches = json.patches;
    const sortedByDate = patches?.sort(
      (a, b) => b.patch_timestamp - a.patch_timestamp
    );
    const threeLatest = sortedByDate?.slice(0, 3).reverse();
    console.log(threeLatest);
    console.log("");

    if ((patches?.length || existingPatches) > existingPatches || testing) {
      displayPatchFound();
    } else {
      displayPatchNotFound();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function displayPatchFound(): void {
  console.log(colors.FgGreen, `PATCH STATUS: ${positive}`);
  console.log(" " + new Date(Date.now()));
  console.log("");
  player.play("./files/clip.mp3", function (err) {
    if (err) {
      console.log("Error playing sound: " + err);
    }
  });
  clearInterval(interval);
}

function displayPatchNotFound(): void {
  console.log(colors.FgRed, `PATCH STATUS: ${negativePatchMessage()} `);
}

function displayTimeline(): void {
  const date = new Date();
  const nowInMinutes = date.getHours() * 60 + date.getMinutes();
  const nextPatches = previousPatchTimes.patches
    .sort((a, b) => a.t - b.t)
    .filter((x) => x.t > nowInMinutes);

  const timeline = new Array(nextPatches[nextPatches.length - 1].t + 10)
    .fill("-")
    .map((_, i) => (nextPatches.find((x) => x.t == i) ? "|" : "-"));

  let next = "";
  const timelineSubtitle = new Array(nextPatches[nextPatches.length - 1].t + 10)
    .fill(" ")
    .map((_, i) => {
      const res = nextPatches.find((x) => x.t == i);
      let nextChar = " ";

      if (res != undefined) {
        next = res.p;
      }

      if (next.length > 0) {
        nextChar = next[0];
        next = next.slice(1);
      }

      return nextChar;
    });

  let currentSnapshot =
    "|" + timeline.slice(nowInMinutes, nowInMinutes + TIMELINE_LENGTH).join("");

  let currentSnapshotSubtitle = timelineSubtitle
    .slice(nowInMinutes, nowInMinutes + TIMELINE_LENGTH + 2)
    .join("");

  if (!currentSnapshotSubtitle.includes("7.")) {
    currentSnapshot = currentSnapshot.slice(0, -2) + "~|";
    currentSnapshotSubtitle =
      currentSnapshotSubtitle.slice(0, -2) + nextPatches[0].p;
  }

  console.log(rn(2));
  console.log(colors.FgWhite, "TIMELINE");
  console.log("");
  console.log(currentSnapshotSubtitle);
  console.log(currentSnapshot);
  console.log("^ now");

  console.log(rn(1), "Release time of historic patches:");

  for (const i in nextPatches) {
    console.log(
      r(20, " "),
      nextPatches[i].p,
      "in",
      minutesToHourAndMinutes(nextPatches[i].t - nowInMinutes)
    );
  }
  console.log(rn(2));
}

function negativePatchMessage(): string {
  return random(negative);
}

function random<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function main(): void {
  interval = setInterval(go, 10 * 1000);
  go();
}

function minutesToHourAndMinutes(minutes: number): string {
  if (minutes < 60) return minutes + " minutes";
  return Math.floor(minutes / 60) + " hours, " + (minutes % 60) + " minutes";
}

main();

module.exports = {
  go,
  displayTimeline,
  displayPatchFound,
  displayPatchNotFound,
  negativePatchMessage,
  random,
  minutesToHourAndMinutes,
};
