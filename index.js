const player = require('play-sound')((opts = {}));
const url = 'https://www.dota2.com/datafeed/patchnoteslist';
const audioFile = './files/clip.mp3';

async function go() {
  const res = await fetch(url);
  const json = await res.json();
  var patches = json.patches;

  var sortedByDate = patches.sort((a, b) => b.patch_timestamp - a.patch_timestamp);
  var last = sortedByDate.shift();
  const lastDate = new Date(last.patch_timestamp * 1000);

  if (isToday(lastDate)) {
    displayPatchFound(last);
  }
}

const interval = setInterval(() => {
  go();
}, 5 * 1000);

function displayPatchFound(patch) {
  console.log(patch);
  player.play(audioFile);
  clearInterval(interval);
}

function isToday(patchDay) {
  const today = new Date();
  return patchDay.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0);
}
