import { Devvit } from "@devvit/public-api";

interface LeaderboardProps {
  onClose: () => void;
  context: Devvit.Context;
  scores: any;
}

export const Leaderboard = (props: LeaderboardProps): JSX.Element => {
  const data = props.scores[0];
  console.log(props.scores);
  return (
    <vstack
      width='100%'
      height='100%'
      alignment='top center'
      backgroundColor='#fbcfe8'>
      <button icon='home' width='32px' height='32px' onPress={props.onClose} />
      <vstack
        width='100%'
        height='100%'
        alignment='center middle'
        backgroundColor='#fbcfe8'
        padding='medium'
        gap='medium'>
        <text size='large' weight='bold'>
          Top Scorers
        </text>

        <hstack gap='small'>
          <button appearance='primary' size='small'>
            {data[0].score}
          </button>

          <button appearance='primary' size='small'>
            {data[0].member}
          </button>
        </hstack>
        <hstack gap='small'>
          <button appearance='primary' size='small'>
            {data[1].score}
          </button>

          <button appearance='primary' size='small'>
            {data[1].member}
          </button>
        </hstack>
        <hstack gap='small'>
          <button appearance='primary' size='small'>
            {data[2].score}
          </button>

          <button appearance='primary' size='small'>
            {data[2].member}
          </button>
        </hstack>
      </vstack>
    </vstack>
  );
};
