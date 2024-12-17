import './createPost.js';
import {App} from './App.js';
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
});


Devvit.addCustomPostType({
  name: 'Wordoku Puzzle',
  height: 'tall',
  render: App
});

export default Devvit;
