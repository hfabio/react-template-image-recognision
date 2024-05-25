export const CameraErrorMessages = {
  notAvailable: "Browser API navigator.mediaDevices.getUserMedia not available",
};

export const videoConfig = {
  audio: false,
  video: {
    width: globalThis.screen.availWidth,
    height: globalThis.screen.availHeight,
    frameRate: {
      ideal: 24,
    },
  },
};

export default class Camera {
  constructor() {
    this.video = document.createElement("video");
  }

  static async init(DEBUG = import.meta.env.VITE_DEBUG_CAMERA === 'true') {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
      throw new Error(CameraErrorMessages.notAvailable);
    
    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    const camera = new Camera();
    camera.video.srcObject = stream;
    camera.video.height = 240;
    camera.video.width = 360;
    if (DEBUG) document.body.insertBefore(camera.video, document.body.firstChild);

    // aguarda pela câmera!
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video);
      };
    });

    camera.video.play();
    return camera;
  }
}