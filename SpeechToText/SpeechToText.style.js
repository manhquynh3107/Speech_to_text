import styled from 'styled-components';

const SpeechToTextWrapper = styled.div`
  .controls {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding: 0;
    text-align: center;
  }

  #log {
    font-size: 80%;
  }

  #overlay {
    position: absolute;
    top: 250px;
    color: #fff;
    text-align: center;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.3);
    width: 640px;
    padding: 10px 0;
    z-index: 2147483647;
  }

  #v {
    z-index: 1;
  }

  .loader {
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }
  #statusBar {
    font-family: monospace;
    color: #9f000f;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0;
  }
  #serverStatusBar {
    position: fixed;
    bottom: 0.4em;
    right: 0.4em;
    top: auto;
    left: auto;
    font-family: monospace;
    padding: 0.2em 0.2em 0.2em 0.2em;
  }
  .highlight {
    color: red;
  }
  ins {
    background-color: #c6ffc6;
    text-decoration: none;
  }

  del {
    background-color: #ffc6c6;
  }
  .diff {
    font-family: monospace;
  }

  .buttonsContainer {
    display: table;
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100%;
    height: 10%;
    text-align: center;
    background-color: rgba(128, 128, 200, 0.7);
  }

  #asr_result {
    background-color: #fff;
    color: #222;
    resize: none;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  #buttonStart {
    z-index: 10000 !important;
    padding: 12px 30px;
    text-transform: uppercase;
    border-radius: 5px;
    background: rgb(255, 0, 0);
    font-weight: 700;
    color: #fff;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;

    &:hover {
      cursor: pointer;
      background: rgb(255, 0, 0, 0.8);
      box-shadow: -2 2px 2px 0 rgba(0, 188, 212, 0.14),
        0 3px 1px -2px rgba(0, 188, 212, 0.2),
        0 1px 5px 0 rgba(0, 188, 212, 0.12);
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

export { SpeechToTextWrapper };
