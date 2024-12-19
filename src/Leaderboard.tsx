import { Devvit } from "@devvit/public-api";

interface LeaderboardProps {
  onClose: () => void;
  context: Devvit.Context;
  scores: any;
}

export const Leaderboard = (props: LeaderboardProps): JSX.Element => {
  const topScores = props.scores[0];
  const userScore = props.scores[1] ? props.scores[1] : 0;
  let topScorersRender = null;
  if (topScores.length > 0) {
    topScorersRender = (
      <vstack
        width='100%'
        height='100%'
        alignment='center top'
        backgroundColor='#fbcfe8'
        padding='medium'
        gap='medium'>
        <image url='top.png' imageWidth='400px' imageHeight='150px' />
        <vstack gap='small'>
          {topScores.map((score: any, index: number) => (
            <hstack gap='small'>
              <button appearance='primary' size='medium'>
                {score.score}
              </button>
              <button appearance='primary' size='medium'>
                {score.member}
              </button>
            </hstack>
          ))}
        </vstack>
        <spacer height='10px' />

        <vstack>
          <button appearance='primary' size='large'>
            Your Highest Score is {userScore}
          </button>
        </vstack>
      </vstack>
    );
  } else {
    topScorersRender = (
      <vstack
        width='100%'
        height='100%'
        alignment='center middle'
        backgroundColor='#fbcfe8'
        padding='medium'
        gap='medium'>
        <vstack gap='small'>
          <image url='top.png' imageWidth='400px' imageHeight='150px' />

          <vstack gap='medium'>
            <button appearance='primary' size='large'>
              No Top Scores Yet. Play to get on the leaderboard!
            </button>
            <spacer height='10px' />
            <button appearance='primary' size='large'>
              Your Highest Score is {userScore}
            </button>
          </vstack>
        </vstack>
      </vstack>
    );
  }

  return (
    <vstack
      width='100%'
      height='100%'
      alignment='top center'
      backgroundColor='#fbcfe8'>
      <button icon='home' width='32px' height='32px' onPress={props.onClose} />
      {topScorersRender}
    </vstack>
  );
};
