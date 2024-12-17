import { Devvit, useState } from "@devvit/public-api";
import { Scoring } from "./Scoring.js";
import { Leaderboard } from "./Leaderboard.js";
import { Play } from "./Play.js";
import { handlePostRandomData } from "./utils.js";
import { getLeaderboard } from "./utils.js";

export function App(ctx: Devvit.Context): JSX.Element {
  const [page, setPage] = useState("menu");
  const Menu = (
    <vstack
      width='100%'
      height='100%'
      alignment='top center'
      backgroundColor='#fbcfe8'
      gap='large'
      padding='medium'>
      <vstack width='100%' alignment='center' gap='none'>
        <image
          url='logo.png'
          imageWidth='621px'
          imageHeight='167.5px'
          width='100%'
          resizeMode='fit'
        />
        <text size='xlarge' color='grey'>
          find words, fill grid, earn points
        </text>
      </vstack>
      <button
        appearance='primary'
        size='large'
        minWidth='128px'
        icon='play-fill'
        onPress={() => setPage("play")}>
        Play
      </button>
      <button
        appearance='primary'
        size='large'
        minWidth='128px'
        icon='play-fill'
        onPress={() => setPage("scoring")}>
        Scoring
      </button>
      <button
        appearance='primary'
        size='large'
        minWidth='128px'
        icon='play-fill'
        onPress={() => setPage("leaderboard")}>
        Leaderboard
      </button>
    </vstack>
  );
  const [rcData] = useState(async () => {
    console.log("fetching data");
    return await handlePostRandomData(ctx);
  });
  console.log(rcData);
  const [leaderboardData] = useState(async () => {
    return await getLeaderboard(ctx);
  });
  if (!ctx.postId) throw Error("no post ID");
  if (!ctx.userId) throw Error("no user ID");
  const onClose = (): void => {
    setPage("menu");
  };
  const pages: Record<string, JSX.Element> = {
    menu: Menu,
    scoring: <Scoring onClose={onClose} />,
    leaderboard: (
      <Leaderboard scores={leaderboardData} context={ctx} onClose={onClose} />
    ),
    play: <Play data={rcData} context={ctx} />,
  };
  return pages[page];
}
