import { Devvit, useState, useForm } from "@devvit/public-api";
import { createComment } from "./utils.js";

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
  const customForm = useForm(
    (data) => {
      return {
        fields: [
          {
            type: "string",
            name: "comment",
            label: "Comment",
            required: true,
            defaultValue: data.text,
          },
        ],
      } as const;
    },
    (event) => {
      console.log(event.comment);
      createComment(event.comment, props.context);
    }
  );

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
            onMessage={(message: any) => {
              if (message) {
                if (message.type === "commentStr") {
                  const text = message.data.comment;
                  props.context.ui.showForm(customForm, { text });
                }
              }
            }}
            grow
            height={webviewVisible ? "100%" : "0%"}
          />
        </vstack>
      </vstack>
    </vstack>
  );
};
