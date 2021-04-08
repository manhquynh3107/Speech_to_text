import React from 'react';
import { Input, message } from 'antd';
import { GameShowWrapper, Calculator } from './GameShow.style';
import { SYNTHESIS_SERVICE, APP_ID, APP_ID_ORDER, VBEE_WEB_API_SERVICE, DEMO_PRODUCT_ID } from '../../config';
import SynthesisSetting from './SynthesisSetting';
// import Title from '../../components/Title';
import {
  title,
  subtitle,
  inputTextAreaPlaceholder,
  maxNumberOfCharacters,
  initialInputText,
} from './config';
import styles from './home.css';
import tempAudio from '../../../public/audios/temp-audio.mp3';
import { sendMail } from '../../apis/mail';
import SpeechToText from './SpeechToText/SpeechToText';
import getScore from './score';
import Organizations from './Organizations/Organizations';
import Title from './Title/Title';

message.config({
  duration: 2,
});

let ws;

class GameShow extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: initialInputText,
      voice: 'hn_male_xuantin_vdts_48k-hsmm',
      bitRate: '128000',
      audios: [],
      audioStreaming: tempAudio,
      audioFinal: '',
      typeOfAudio: 'tempAudio',
      numberOfCharacters: initialInputText.length,
      isShowEmbededCode: false,
      statusStreaming: 0,
      email: '',
      indexAudio: -1,
      maxAudio: 1,
      isGetSizeOfPart: false,
      showAudioWrapper: false,
      currentTime: 0,
      tempTimeAudio: 0,
      isEdit: true,
      isPlay: false,
      endPlay: false,
      loopPlay: true,
      score: 0,
      clickCheck: false,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Vietnamese Reading Gameshow';
  }

  onClickMakeSound = () => {
    this.setState({
      audios: [],
      audioStreaming: tempAudio,
      indexAudio: -1,
      typeOfAudio: 'tempAudio',
      audioFinal: '',
      isShowEmbededCode: false,
      maxAudio: 1,
      isGetSizeOfPart: false,
    });
    this.connectWebsocket();
  };
  onChooseVoice = (voice) => {
    this.setState({
      voice,
      isEdit: true,
    });
  };
  onChooseBitRate = (bitRate) => {
    this.setState({
      bitRate,
      isEdit: true,
    });
  };
  onChangeText = (e) => {
    this.setState({
      inputText: e.target.value,
      numberOfCharacters: e.target.value.length,
      isEdit: true,
    });
  };
  findAudio = (index) => {
    const { audios } = this.state;
    for (let i = 0; i < audios.length; i += 1) {
      if (audios[i].index === index) {
        return audios[i];
      }
    }
    return null;
  }

  playAudioIfCan = (amount) => {
    if (this.state.loopPlay && amount < 1000000) {
      if (this.audioStreaming.readyState === 4) {
        if (this.state.typeOfAudio === 'final') {
          if (this.audioStreaming.currentTime === 0) {
            this.audioStreaming.currentTime = this.state.currentTime;
          } else {
            this.audioStreaming.currentTime = this.state.tempTimeAudio;
          }
        }
        const promise = this.audioStreaming.play();
        if (promise !== undefined) {
          promise.catch(() => {
            this.handlePauseStream();
          }).then(() => {
          });
        }
      } else {
        setTimeout(() => {
          this.playAudioIfCan(amount + 1);
        }, 50);
      }
    }
  }

  onAudioEnded = () => {
    const {
      indexAudio, typeOfAudio, maxAudio, audioFinal,
      isGetSizeOfPart, audios,
    } = this.state;
    if (typeOfAudio === 'final') {
      this.audioStreaming.currentTime = 0;
      this.audioStreaming.pause();
      this.setState({
        statusStreaming: 0,
        currentTime: 0,
        endPlay: true,
      });
      return;
    }
    if (audioFinal.length) {
      this.setState({
        audioStreaming: audioFinal,
        typeOfAudio: 'final',
        statusStreaming: 2,
      });
      this.audioStreaming.src = audioFinal;
      this.audioStreaming.load();
      this.playAudioIfCan(1);
      return;
    }
    const nextAudio = this.findAudio(indexAudio + 1);
    if (nextAudio) {
      this.setState({
        audioStreaming: nextAudio.audio_url,
        indexAudio: nextAudio.index,
        typeOfAudio: 'streaming',
        statusStreaming: 2,
        audios: audios.filter(audio => audio.index !== nextAudio.index),
      });
      this.audioStreaming.src = nextAudio.audio_url;
      this.audioStreaming.load();
      this.playAudioIfCan(1);
    } else if (isGetSizeOfPart) {
      if (indexAudio + 1 === maxAudio) {
        if (audioFinal.length) {
          this.setState({
            audioStreaming: audioFinal,
            typeOfAudio: 'final',
            statusStreaming: 0,
            audios: audios.filter(audio => audio.index !== 'final'),
          });
          this.audioStreaming.src = audioFinal;
          this.audioStreaming.pause();
        } else if (typeOfAudio === 'tempAudio') {
          this.audioStreaming.currentTime = 0;
          this.audioStreaming.play();
        } else {
          this.setState({
            audioStreaming: tempAudio,
            typeOfAudio: 'tempAudio',
          });
          this.audioStreaming.src = tempAudio;
          this.audioStreaming.play();
          this.checkFinalReturn();
        }
      } else if (typeOfAudio === 'tempAudio') {
        this.audioStreaming.currentTime = 0;
        this.audioStreaming.play();
      } else {
        this.setState({
          audioStreaming: tempAudio,
          typeOfAudio: 'tempAudio',
        });
        this.audioStreaming.src = tempAudio;
        this.audioStreaming.play();
      }
    } else if (typeOfAudio === 'tempAudio') {
      this.audioStreaming.currentTime = 0;
      this.audioStreaming.play();
    } else {
      this.setState({
        audioStreaming: tempAudio,
        typeOfAudio: 'tempAudio',
      });
      this.audioStreaming.src = tempAudio;
      this.audioStreaming.play();
    }
  }

  checkFinalReturn = () => {
    setTimeout(() => {
      if (this.state.typeOfAudio !== 'final') {
        message.error('Kết nối mạng có vấn đề. Mời bạn thử lại!');
        this.handlePauseStream();
        this.setState({
          endPlay: true,
        });
      }
    }, 1000);
  }

  onSpeakNow = async () => {
    if (this.state.inputText.length > maxNumberOfCharacters) {
      alert('Input text is too length!');
    } else {
      if (this.audioStreaming.src !== tempAudio) {
        this.audioStreaming.src = tempAudio;
      }
      this.audioStreaming.play();
      this.setState({
        statusStreaming: 1,
        showAudioWrapper: true,
        currentTime: 0,
        isEdit: false,
        endPlay: false,
        loopPlay: true,
      });
      this.onClickMakeSound();
    }
  };
  onGetEmbededCode = () => {
    this.setState({ isShowEmbededCode: !this.state.isShowEmbededCode });
  };
  onChangeInputTextFromReadingDocx = (text) => {
    this.setState({
      inputText: text,
      numberOfCharacters: text.length,
      isEdit: true,
    });
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  onRequestSynthesis = () => {
    const {
      inputText, email, voice, bitRate,
    } = this.state;
    if (email.length) {
      const isEmailValid = this.validateEmail(email);
      if (isEmailValid) {
        ws = new WebSocket(SYNTHESIS_SERVICE);
        ws.onopen = () => {
          ws.send(JSON.stringify({
            APP_ID: APP_ID_ORDER,
            PRODUCT_ID: DEMO_PRODUCT_ID,
            INPUT_TEXT: inputText,
            BIT_RATE: bitRate,
            VOICE: voice,
            ORDER: Date.now(),
            HTTP_CALLBACK: `${VBEE_WEB_API_SERVICE}/api/v1/callback?email=${email}&voice=${voice}&bit-rate=${bitRate}`,
          }));
          sendMail({
            to: email,
            subject: 'Dịch vụ tổng hợp Vbee',
            text: `Chào ${email}! \n` +
              'Yêu cầu tổng hợp văn bản của bạn đã được tiếp nhận và sẽ được xử lý trong thời gian muộn nhất từ 4 - 8 (h). \n' +
              'Cảm ơn bạn đã sử dụng vbee.vn.',
          });
          message.success('Yêu cầu của bạn đã được gửi thành công!');
          this.setState({
            email: '',
          });
        };
      } else {
        message.error('Emai không hợp lệ');
      }
    } else {
      message.error('Vui lòng nhập email');
    }
  }
  checkOnPause = () => {
    if (!this.isEqual(this.audioStreaming.currentTime, this.audioStreaming.duration)) {
      this.setState({
        statusStreaming: 0,
        isPlay: false,
      });
    }
  }
  isEqual = (n1, n2) => {
    if (!n1 || !n2) {
      return true;
    }
    return Math.abs(n1 - n2) < 0.00001;
  }
  checkOnPlay = () => {
    const { typeOfAudio } = this.state;
    this.setState({
      isPlay: true,
    });
    if (typeOfAudio === 'streaming' && this.audioStreaming.currentTime > 0.02) {
      this.setState({
        statusStreaming: 2,
      });
    }
  }
  onLoadedMetadata = () => {
    const { typeOfAudio, currentTime } = this.state;
    if (typeOfAudio === 'streaming') {
      this.setState({
        currentTime: currentTime + this.audioStreaming.duration,
      });
    }
  }
  connectWebsocket = () => {
    if (ws) {
      if (ws.readyState === ws.OPEN) {
        ws.close();
      }
    }
    this.setState({
      statusStreaming: 1,
      typeOfAudio: 'tempAudio',
      audioStreaming: tempAudio,
    });
    ws = new WebSocket(SYNTHESIS_SERVICE);
    ws.onopen = () => {
      if (this.state.inputText) {
        ws.send(JSON.stringify({
          APP_ID,
          PRODUCT_ID: DEMO_PRODUCT_ID,
          INPUT_TEXT: this.state.inputText,
          BIT_RATE: this.state.bitRate,
          VOICE: this.state.voice,
        }));
      } else {
        alert('Vui lòng nhập văn bản');
      }
    };
    ws.onmessage = (res) => {
      const { index, audio_url, size_of_part } = JSON.parse(res.data);
      switch (index) {
        case 'size-of-part':
          this.setState({
            maxAudio: parseInt(size_of_part, 10),
            isGetSizeOfPart: true,
          });
          break;
        case 'done':
          break;
        case 'final': {
          this.setState({
            audioFinal: audio_url,
            audios: [...this.state.audios, { index: 'final', audio_url }],
          });
          break;
        }
        default: {
          this.setState({
            audios: [...this.state.audios, { index: parseInt(index, 10), audio_url }],
          });
        }
      }
    };
  };
  validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  createEmbeddedCode = audioSource =>
    `<audio controls>\n    <source src="${audioSource}" type="audio/mpeg" />\n </audio>`;

  handlePauseStream = () => {
    this.setState({
      loopPlay: false,
      statusStreaming: 0,
      isPlay: false,
    });
    this.audioStreaming.pause();
  }

  handleContinueStream = () => {
    this.setState({
      loopPlay: true,
    });
    setTimeout(() => {
      this.playAudioIfCan(1);
      this.checkOnPlay();
    }, 50);
  }

  onTimeUpdate = () => {
    this.setState({
      tempTimeAudio: this.audioStreaming.currentTime,
    });
  }

  onGetScore = () => {
    const originText = this.state.inputText;
    const readingText = document.getElementById('asr_result').value;
    const score = getScore(originText, readingText);
    // document.getElementById('asr_result').value = '';
    this.setState({ score });
  }

  render() {
    const {
      numberOfCharacters,
      inputText,
      audioStreaming,
      statusStreaming,
      voice,
      bitRate,
      isEdit,
      typeOfAudio,
      isPlay,
      endPlay,
      score,
    } = this.state;
    const showSpeakNowDisable = inputText.length === 0 && statusStreaming === 0;
    const showSpeakNow = (inputText.length > 0 && statusStreaming === 0 && (isEdit || endPlay));
    const showContinue = statusStreaming === 0 && !isEdit && !isPlay && !endPlay;
    const showIsSounding = (statusStreaming === 2 || statusStreaming === 0) && isPlay && this.audioStreaming && this.audioStreaming.readyState === 4 && !endPlay;
    const showIsProcessing = statusStreaming === 1;
    const showLoadingAudio = (statusStreaming === 2 || statusStreaming === 0) && isPlay && this.audioStreaming.readyState !== 4;
    return (
      <GameShowWrapper>
        <div
          style={{
            minHeight: '100vh',
          }}
        >
          <div className={styles.homeWrapper}>
            {/* <Title title={title} subtitle={subtitle} /> */}
            <Title />
            <div>
              {numberOfCharacters === 0 ?
                <span className={styles.zeroCount}>
                  {numberOfCharacters}/{maxNumberOfCharacters}
                </span> : null
              }
              {(numberOfCharacters > 0 && numberOfCharacters <= maxNumberOfCharacters) ?
                <span className={styles.count}>
                  {numberOfCharacters}/{maxNumberOfCharacters}
                </span> : null
              }
              {numberOfCharacters > maxNumberOfCharacters ?
                <span className={styles.reachToMaxCount}>
                  {numberOfCharacters}/{maxNumberOfCharacters}
                </span> : null
              }
              <Input.TextArea
                placeholder={inputTextAreaPlaceholder}
                rows={5}
                value={inputText}
                onChange={this.onChangeText}
                className={styles.inputTextArea}
                disabled={isPlay && !endPlay}
                ref={(input) => { this.inputText = input; }}
              />
              <br />
              {showSpeakNow ? (
                <SynthesisSetting
                  voice={voice}
                  bitRate={bitRate}
                  onSpeakNow={this.onSpeakNow}
                  onChooseVoice={this.onChooseVoice}
                  onChooseBitRate={this.onChooseBitRate}
                  title="Listen"
                  type="speakNow"
                  btnStyle={{ background: '#ecca51', color: '#000' }}
                />
              ) : null}
              {
                showLoadingAudio ?
                  (
                    <SynthesisSetting
                      voice={voice}
                      bitRate={bitRate}
                      prevIcon="loading"
                      title="Pause"
                      isPlay={isPlay}
                      onChooseVoice={this.onChooseVoice}
                      onChooseBitRate={this.onChooseBitRate}
                      onSpeakNow={this.handlePauseStream}
                      btnStyle={{ background: 'green', color: '#FFF' }}
                    />
                  ) : null
              }
              {
                showContinue ? (
                  <SynthesisSetting
                    voice={voice}
                    bitRate={bitRate}
                    prevIcon="play-circle-o"
                    onSpeakNow={this.handleContinueStream}
                    onChooseVoice={this.onChooseVoice}
                    onChooseBitRate={this.onChooseBitRate}
                    title="Continue"
                    btnStyle={{ background: 'green', color: '#FFF' }}
                  />
                ) : null
              }
              {showSpeakNowDisable ? (
                <SynthesisSetting
                  voice={voice}
                  bitRate={bitRate}
                  title="Listen"
                  onChooseVoice={this.onChooseVoice}
                  onChooseBitRate={this.onChooseBitRate}
                  btnStyle={{ background: '#bcbcbc', color: '#000' }}
                  disabled
                />
              ) : null}
              {showIsProcessing ? (
                <SynthesisSetting
                  voice={voice}
                  bitRate={bitRate}
                  title="Processing"
                  onChooseVoice={this.onChooseVoice}
                  onChooseBitRate={this.onChooseBitRate}
                  btnStyle={{ background: '#bcbcbc', color: '#000' }}
                  disabled
                />
              ) : null}
              {showIsSounding ? (
                <SynthesisSetting
                  voice={voice}
                  bitRate={bitRate}
                  prevIcon="pause-circle-o"
                  title="Pause"
                  isPlay={isPlay}
                  onChooseVoice={this.onChooseVoice}
                  onChooseBitRate={this.onChooseBitRate}
                  onSpeakNow={this.handlePauseStream}
                  btnStyle={{ background: 'green', color: '#FFF' }}
                />
              ) : null}
              <div
                className={`${styles.audioWrapper} ${typeOfAudio === 'final' && this.state.showAudioWrapper ? styles.display : styles.hidden}`}
              >
                <audio
                  ref={(input) => {
                    this.audioStreaming = input;
                  }}
                  controls
                  onEnded={this.onAudioEnded}
                  onPause={this.checkOnPause}
                  onPlay={this.checkOnPlay}
                  onTimeUpdate={this.onTimeUpdate}
                  onLoadedMetadata={this.onLoadedMetadata}
                  muted={this.state.typeOfAudio === 'tempAudio'}
                  className={styles.audio}
                  controlsList="nodownload"
                >
                  <source src={audioStreaming} />
                  <track kind="captions" />
                </audio>
              </div>
              <div style={{ height: '50px' }} />
              <SpeechToText />

              <Calculator>
                <button className="btn-check" onClick={this.onGetScore}>CHECK</button>
                <div className="score">{score}%</div>
              </Calculator>
            </div>
          </div>
        </div>
      </GameShowWrapper>
    );
  }
}

export default GameShow;
