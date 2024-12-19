import { Devvit } from "@devvit/public-api";

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
  const user = await ctx.reddit.getCurrentUser();
  let username = "anon";
  let userScore = null;
  let scores: any = [];
  if (user) {
    username = user.username;
  }

  if (postId) {
    userScore = await redis.zScore(`${postId}_leaderboard`, username);
    scores = await redis.zRange(`${postId}_leaderboard`, 0, 2);
  }
  return [scores, userScore];
}
export const uploadScore = async (score: number, ctx: Devvit.Context) => {
  const redis = ctx.redis;
  const user = await ctx.reddit.getCurrentUser();
  let username = "anon";
  if (user) {
    username = user.username;
  }
  const postId = ctx.postId;
  if (postId) {
    let userScore = await redis.zScore(`${postId}_leaderboard`, username);
    userScore = userScore ? userScore : 0;
    if (userScore < score) {
      await redis.zAdd(`${postId}_leaderboard`, {
        member: username,
        score: score,
      });
    }
  }
};
export const createComment = async (grid: string, ctx: Devvit.Context) => {
  const postId = ctx.postId;
  if (postId) {
    await ctx.reddit.submitComment({
      id: postId,
      text: "```" + grid + "```",
    });
  }
};
