import { CompreFace } from "@exadel/compreface-js-sdk";

export const useCompreFace = () => {
  const server = "http://localhost";
  const port = 8000;

  const detection_key = "79385fad-5a3b-4abb-8b06-ae650e639b95";
  const recognition_key = "10ca1151-f830-4ce0-ac53-9714c77c3241";

  const core = new CompreFace(server, port);
  const detection_service = core.initFaceDetectionService(detection_key);
  const recognitionService = core.initFaceVerificationService(recognition_key);
  //   const verification_service = core.initFaceVerificationService(recognition_key);

  return { detection_service, recognitionService };
};
