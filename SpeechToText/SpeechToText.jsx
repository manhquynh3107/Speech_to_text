import React from 'react';
import { SpeechToTextWrapper } from './SpeechToText.style';
import { toogleListening } from '../../../../build/js/asr';

class SpeechToText extends React.Component {
  createMarkup = html => ({ __html: html });

  onClick = () => {
    toogleListening();
  }

  render() {
    return (
      <SpeechToTextWrapper>
        <div className="controls">
          <button id="buttonStart" onClick={this.onClick}>Start reading</button>
        </div>
        <textarea
          id="asr_result"
          name="text"
          rows="5"
          style={{
            wordWrap: 'break-word',
            resize: 'none',
            width: '100%',
          }}
          readOnly
        />
        <br />
        <div id="loader" style={{ display: 'none' }}>
          Loading video
          <div className="loader" />
        </div>
        <div id="statusBar" />
      </SpeechToTextWrapper>
    );
  }
}

export default SpeechToText;
