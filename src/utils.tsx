import { Devvit } from "@devvit/public-api";
import { Leaderboard } from "./Leaderboard.js";

const selectThreeElements = () => {
  const selectedRows: number[] = [];
  while (selectedRows.length < 3) {
    const randomIndex = Math.floor(Math.random() * 5);
    if (!selectedRows.includes(randomIndex)) {
      selectedRows.push(randomIndex);
    }
  }
  let selectedCols: number[] = [];
  while (selectedCols.length < 3) {
    const randomIndex = Math.floor(Math.random() * 5);
    if (!selectedCols.includes(randomIndex)) {
      selectedCols.push(randomIndex);
    }
  }
  let letters: string[] = [];
  for (let i = 0; i < 3; i++) {
    const randLetter = String.fromCharCode(
      Math.floor(Math.random() * (91 - 65)) + 65
    );
    letters.push(randLetter);
  }
  const gridRandomData = {
    rows: selectedRows,
    cols: selectedCols,
    letters: letters,
  };
  return gridRandomData;
};
export async function handlePostRandomData(ctx: Devvit.Context): Promise<any> {
  const redis = ctx.redis;
  const postId = ctx.postId;
  let rcData = null;

  if (postId) {
    rcData = await redis.hGetAll(postId);
    if (Object.keys(rcData).length === 0) {
      rcData = selectThreeElements();
      console.log(rcData);
      await redis.hSet(postId, {
        rows: JSON.stringify(rcData.rows),
        cols: JSON.stringify(rcData.cols),
        letters: JSON.stringify(rcData.letters),
      });
    }
  } else {
    console.log("post not found");
  }

  return rcData;
}

export async function getLeaderboard(ctx: Devvit.Context): Promise<any> {
  const redis = ctx.redis;
  const postId = ctx.postId;
  const curUser = await ctx.reddit.getCurrentUser();

  return [
    [
      { score: 100, member: "user1" },
      { score: 90, member: "user2" },
      { score: 80, member: "user3" },
    ],
    100,
  ];
}
