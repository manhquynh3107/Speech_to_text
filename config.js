const title = 'Who let the words out';
const subtitle = 'Vbee Group, SoICT, HUST';
const inputTextAreaPlaceholder = 'Type Vietnamese text here...';
const initialInputText = 'Xin chào Việt Nam';
const maxNumberOfCharacters = 500;

const voices = [
  {
    name: 'hn_male_xuantin_vdts_48k-hsmm',
    displayName: 'Mạnh Dũng (Nam HN)',
    active: true,
    id: '5a59a9ba68679004237ce24c',
  },
  {
    name: 'hn_female_xuanthu_news_48k-hsmm',
    displayName: 'Mai Phương (Nữ HN)',
    active: true,
    id: '5a59a9ca68679004237ce24d',
  },
  {
    name: 'sg_male_xuankien_vdts_48k-hsmm',
    displayName: 'Nhất Nam (Nam Sài Gòn)',
    active: true,
    id: '5a59a9d968679004237ce24e',
  },
  {
    name: 'hn_female_thutrang_phrase_48k-hsmm',
    displayName: 'Thùy Linh (Nữ HN)',
    active: true,
    id: '5a7dec2af3cb0433bc8a0f18',
  },
  {
    name: 'sg_female_xuanhong_vdts_48k-hsmm',
    displayName: 'Lan Trinh',
    active: true,
  },
  {
    name: 'sg_male_minhhoang_dial_48k-hsmm',
    displayName: 'Minh Hoàng (Nam Sài Gòn)',
    active: true,
  },
  {
    name: 'sg_female_thaotrinh_dialog_48k-hsmm',
    displayName: 'Thảo Trinh (Nữ Sài Gòn)',
    active: true,
  },
];

const voiceQualities = [
  { displayQuality: '128kbps', quality: '128000' },
  { displayQuality: '320kbps', quality: '320000' },
];

export {
  title,
  subtitle,
  inputTextAreaPlaceholder,
  maxNumberOfCharacters,
  initialInputText,
  voices,
  voiceQualities,
};

