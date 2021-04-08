/**
 * GET https://user.baonoivn.vn/api/v1/voices
 */

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
    displayName: 'Lan Trinh (Nữ Sài Gòn)',
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

// BIT_RATE
const voiceQualities = [
  // { displayQuality: '8kbps', quality: '8000' },
  // { displayQuality: '16kbps', quality: '16000' },
  // { displayQuality: '32kbps', quality: '32000' },
  // { displayQuality: '48kbps', quality: '48000' },
  // { displayQuality: '64kbps', quality: '64000' },
  // { isplayQuality: '96kbps', quality: '96000' },
  { displayQuality: '128kbps', quality: '128000' },
  { displayQuality: '320kbps', quality: '320000' },

];

// SAMPLE_RATE ~ BIT_RATE (max: 48000)

const speakNow = 'Đọc ngay!';

export { voices, voiceQualities, speakNow };
