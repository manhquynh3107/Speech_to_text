import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Icon } from 'antd';
import uuid from 'uuid';
import styles from './index.css';
import { voices, voiceQualities } from './config';
import iconVoice from '../../../../public/images/ic-voice.png';

class SynthesisSetting extends React.Component {
  onChooseVoice = (voice) => {
    this.props.onChooseVoice(voice);
  }
  onChooseBitRate = (bitRate) => {
    this.props.onChooseBitRate(bitRate);
  }

  onSpeakNow = () => {
    this.handleAfterVerified();
  }

  handleAfterVerified = () => {
    this.props.onSpeakNow();
  }

  render() {
    const {
      title, voice, bitRate,
      disabled, btnStyle, prevIcon, isPlay,
    } = this.props;
    return (
      <div className="synthesis-setting">
        <div className="voice-name">
          <img alt="icon-voice" src={iconVoice} style={{ marginBottom: '10px' }} />&nbsp;<span>Voice</span>
          <Select
            value={voice}
            onChange={this.onChooseVoice}
            className={styles.selectVoice}
            disabled={isPlay || disabled}
          >
            {voices.map(voice => (
              <Select.Option value={voice.name} key={uuid.v4()}>
                {voice.displayName}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="voice-quality">
          <span>Bit rate</span>
          <Select
            value={bitRate}
            onChange={this.onChooseBitRate}
            className={styles.selectBitRate}
            disabled={isPlay || disabled}
          >
            {voiceQualities.map(voiceQuality => (
              <Select.Option value={voiceQuality.quality} key={uuid.v4()}>
                {voiceQuality.displayQuality}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="synthesis">
          {disabled ?
            <Button
              disabled
              style={btnStyle}
              className={styles.btnSpeakNowDisable}
            >
              {
                this.props.isLoading ?
                  <span>
                    <Icon type="loading" /> &nbsp;
                  </span> : null
              }
              {title}
            </Button> :
            <Button
              onClick={this.onSpeakNow}
              style={btnStyle}
              className={styles.btnSpeakNow}
            >
              {
                this.props.isLoading ?
                  <span>
                    <Icon type="loading" /> &nbsp;
                  </span> : null
              }
              {
                prevIcon ? <span><Icon type={prevIcon} /> &nbsp;</span> : null
              }
              {title}
            </Button>}
        </div>
      </div>
    );
  }
}

SynthesisSetting.propTypes = {
  title: PropTypes.string.isRequired,
  voice: PropTypes.string.isRequired,
  bitRate: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChooseVoice: PropTypes.func.isRequired,
  onChooseBitRate: PropTypes.func.isRequired,
  onSpeakNow: PropTypes.func,
  btnStyle: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool,
};

SynthesisSetting.defaultProps = {
  onSpeakNow: () => { },
  disabled: false,
  isLoading: false,
};

export default SynthesisSetting;
