import { Devvit } from "@devvit/public-api";

interface ScoringProps {
  onClose: () => void;
}
export const Scoring = (props: ScoringProps): JSX.Element => {
  return (
    <vstack
      width='100%'
      height='100%'
      alignment='top center'
      backgroundColor='#fbcfe8'
      padding='medium'>
      <button icon='home' width='32px' height='32px' onPress={props.onClose} />
      <image
        url='scoring.jpg'
        resizeMode='fit'
        imageWidth='600px'
        imageHeight='450px'
      />
    </vstack>
  );
};
