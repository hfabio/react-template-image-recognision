import { useRef} from "react";
// import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js";
// import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js";
// import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js";
// import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js";
// import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";

import HandGestureController from "../controllers/handGestureController.js";
import HandGestureView from "../utils/handGestureView.js";
import handGestureService from "../services/HandGestureService.js";
import {
  fingerLookupIndexes,
  gestureStrings,
  knownGestures,
} from "../utils/utils.js";

import Camera from "../utils/camera.js";
const camera = await Camera.init();

const fingerPose = window.fp;
const handPoseDetection = window.handPoseDetection;
const handsVersion = window.VERSION;


// // eslint-disable-next-line no-undef
const styler = new PseudoStyler();

export const useHandGesture = () => {
    const gestureController = useRef(null);

    const initialize = async (canvasRef) => {
      gestureController.current = await HandGestureController.initialize({
        camera,
        view: new HandGestureView({ fingerLookupIndexes, styler, canvasRef }),
        service: new handGestureService({
          fingerLookupIndexes,
          fingerPose,
          handPoseDetection,
          handsVersion,
          gestureStrings,
          knownGestures,
        }),
      })
    }

    return {
      controller: gestureController.current,
      isInitiated: !!gestureController.current,
      initialize
    }
}

export default useHandGesture;