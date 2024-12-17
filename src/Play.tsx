import { Devvit, useState } from "@devvit/public-api";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

interface PlayProps {
  context: Devvit.Context;
  data: { rows: string[]; cols: string[]; letters: string[] };
}

export const Play = (props: PlayProps): JSX.Element => {
  const [webviewVisible, setWebviewVisible] = useState(false);
  const onShowWebviewClick = () => {
    setWebviewVisible(true);
    props.context.ui.webView.postMessage("web-view", {
      type: "initialData",
      data: {
        rows: props.data.rows,
        cols: props.data.cols,
        letters: props.data.letters,
      },
    });
  };
  return (
    <vstack grow padding='small'>
      <vstack
        grow={!webviewVisible}
        height={webviewVisible ? "0%" : "100%"}
        alignment='middle center'>
        <text size='xlarge' weight='bold'>
          The Puzzle is ready to be played. Press Launch to Continue
        </text>
        <spacer />
        <button onPress={onShowWebviewClick}>Launch</button>
      </vstack>
      <vstack grow={webviewVisible} height={webviewVisible ? "100%" : "0%"}>
        <vstack
          border='thick'
          borderColor='black'
          height={webviewVisible ? "100%" : "0%"}>
          <webview
            id='web-view'
            url='page.html'
            grow
            height={webviewVisible ? "100%" : "0%"}
          />
        </vstack>
      </vstack>
    </vstack>
  );
};
