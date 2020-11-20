import {
  Component, OnInit, AfterViewInit, ViewChild,
  ElementRef, Input, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { SocketService } from 'src/socket.service';
import { PlayerToken } from '../../classes/player-token';
import { BattleMapToken } from '../../classes/battle-map-token';
import { BackgroundAudioService } from 'src/app/services/background-audio.service';
import { BattleMapState } from './components/battle-map/battle-map.component';
import { ModalBaseComponent } from './components/modals/modal-base/modal-base.component';
import { TokenModalForm } from './components/modals/token-modal/token-modal.component';
import { EditTokenModalComponent } from './components/modals/edit-token-modal/edit-token-modal.component';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-battle-map-view',
  templateUrl: './battle-map-view.component.html',
  styleUrls: ['./battle-map-view.component.scss']
})
export class BattleMapViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output()
  cellSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef<HTMLInputElement>;

  @ViewChild('imageInput', { static: true })
  imageInput: ElementRef<HTMLInputElement>;

  // TODO: Remove ModalBaseComponent in favor of just using an "addTokenModal"
  @ViewChild('tokenModal', { static: true })
  tokenModal: ModalBaseComponent;

  @ViewChild('editTokenModal', { static: true })
  editTokenModal: EditTokenModalComponent;

  private MOUSEBUTTON = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  public modalOpen: boolean = false;

  public cellSize: number = 30;

  public tokens: BattleMapToken[] = [
    new PlayerToken('Shesdendeliath', 'gold', null, null, BattleMapToken.FACTIONS.ALLIED),
    new PlayerToken('Rowan', 'green', null, null, BattleMapToken.FACTIONS.ALLIED),
    new PlayerToken('Serapine', 'saddlebrown', null, null, BattleMapToken.FACTIONS.ALLIED),
    new PlayerToken('Brihala', 'darkred', null, null, BattleMapToken.FACTIONS.ALLIED),
    new PlayerToken('Matilda', 'grey', null, null, BattleMapToken.FACTIONS.ALLIED),
    new BattleMapToken('Human', 'H', BattleMapToken.FACTIONS.HOSTILE),
    new BattleMapToken('Skeleton', 'S', BattleMapToken.FACTIONS.HOSTILE),
    new BattleMapToken('Skeleton', 'S', BattleMapToken.FACTIONS.HOSTILE),
    new BattleMapToken('Kenku', 'K', BattleMapToken.FACTIONS.HOSTILE),
    new BattleMapToken('Kenku', 'K', BattleMapToken.FACTIONS.HOSTILE),
    new BattleMapToken('Kenku', 'K', BattleMapToken.FACTIONS.HOSTILE),
  ];

  public url: string;
  public mapScale: number = 1;

  // TODO: Given the desire to control initial audio, we may want to create a helper class.
  public rainAudio: HTMLAudioElement;
  public initialRainVolume: number = 0.1;
  public music: HTMLAudioElement;
  public initialMusicVolume: number = 0.05;
  public volume: number = 100;
  public volumeOptions: Options = {
    floor: 0,
    ceil: 100,
    animate: false
  };

  // TODO: Set up socket events when we're ready for multiplayer
  constructor(private socketService: SocketService, private audioService: BackgroundAudioService) { }

  ngOnInit() {
    // Need to better handle which audio files get loaded here.
    // Should there be controls on-screen?
    // Need to explicitly start audio from screen (or by command/keyboard)
    this.rainAudio = this.audioService.createLoopingAudio(BackgroundAudioService.AUDIO_FILES.RAIN, this.initialRainVolume, true);
    this.music = this.audioService.createLoopingAudio(BackgroundAudioService.AUDIO_FILES.WINDMILL, this.initialMusicVolume, true);
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.rainAudio) {
      this.rainAudio.pause();
      this.rainAudio.src = '';
    }

    if (this.music) {
      this.music.pause();
      this.music.src = '';
    }
  }

  public tokenClicked(token: BattleMapToken) {
    this.editTokenModal.openModalWithToken(token);
    console.log(token);
  }

  public playMusic() {
    this.rainAudio.play();
    this.music.play();
  }

  public updateMasterVolume() {
    console.log(this.volume);
    // TODO: Should this go to an array of audios instead of single variables?
    if (this.music) {
      console.log(this.music.volume);
      this.music.volume = this.initialMusicVolume * (this.volume / 100);
    }

    if (this.rainAudio) {
      this.rainAudio.volume = this.initialRainVolume * (this.volume / 100);
    }
  }

  public openTokenModal() {
    this.tokenModal.openModal();
  }

  public handleTokenModal(tokenForm: TokenModalForm) {
    for (let i = 0; i < tokenForm.amount; i++) {
      this.tokens.push(new BattleMapToken(tokenForm.name, tokenForm.name.charAt(0).toUpperCase(), tokenForm.faction));
    }
  }

  public changeTokenSizeTo(size: number) {
    this.cellSize = size;
  }

  public loadMapImage() {
    this.imageInput.nativeElement.value = null;
    this.imageInput.nativeElement.click();
  }

  // TODO: Restrict filetypes in the HTML input
  public imageFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (loadEvent) => {
        this.url = loadEvent.target.result.toString();
      };
    }
  }

  public saveMapState() {
    const mapState: BattleMapState = {
      tokens: this.tokens,
      cellSize: this.cellSize,
      mapImage: this.url
    };
    this.saveMapJSON(mapState);
  }

  public async saveMapJSON(mapState: BattleMapState) {

    const fileName = window.prompt('File Name?', 'Battle Map ' + new Date());
    // Only save the file if it has a name of at least one character
    // TODO - make system safe string validation
    if (typeof fileName === 'string' && fileName.length > 0) {
      const json = JSON.stringify(mapState);
      const blob = new Blob([json], { type: 'application/json' });

      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + '.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }


  public loadMapState() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  public handleLoadedMapJSON($event) {
    const file = $event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.onload = (readerEvent: any) => {
      // TODO: Reset map scale here if desired.
      const mapJSON = readerEvent.target.result;
      const mapState: BattleMapState = JSON.parse(mapJSON);
      this.tokens = mapState.tokens ? mapState.tokens : this.tokens;
      this.cellSize = mapState.cellSize ? mapState.cellSize : this.cellSize;
      this.url = mapState.mapImage ? mapState.mapImage : this.url;
    };
  }
}
