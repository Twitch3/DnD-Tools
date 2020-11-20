import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundAudioService {

  public static AUDIO_FILES = {
    DOCK: '../../../assets/dock-fights.m4a',
    RAIN: '../../../assets/rain.mp4',
    FOREST: '../../../assets/forest-battle.ogg',
    WINDMILL: '../../../assets/windmill.mp3'
  };

  public createLoopingAudio(fileSrc: string, volume?: number, loop?: boolean): HTMLAudioElement {
    const audio = new Audio();
    audio.src = fileSrc;
    audio.volume = volume ? volume : 1;
    audio.loop = loop ? loop : true;
    audio.load();
    return audio;
  }

  constructor() { }
}
