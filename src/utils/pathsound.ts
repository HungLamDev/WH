import success  from '../assets/record/succes.mp3'
import fail  from '../assets/record/fail.mp3'
import { Howl } from 'howler';

export const SUCCESS_SOUND_PATH = success
export const FAILURE_SOUND_PATH = fail

export const successSound = new Howl({
    src: [SUCCESS_SOUND_PATH], // Đường dẫn tới tệp âm thanh thành công
});

export const failureSound = new Howl({
    src: [FAILURE_SOUND_PATH], // Đường dẫn tới tệp âm thanh thất bại
});