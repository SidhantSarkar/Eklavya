import * as tf from '@tensorflow/tfjs';
import { MobileNet, MobileNetMultiplier, OutputStride } from './mobilenet';
import { Pose, PosenetInput } from './types';
export declare type PoseNetResolution = 161 | 193 | 257 | 289 | 321 | 353 | 385 | 417 | 449 | 481 | 513;
export declare class PoseNet {
    mobileNet: MobileNet;
    constructor(mobileNet: MobileNet);
    predictForSinglePose(input: tf.Tensor3D, outputStride?: OutputStride): {
        heatmapScores: tf.Tensor3D;
        offsets: tf.Tensor3D;
    };
    predictForMultiPose(input: tf.Tensor3D, outputStride?: OutputStride): {
        heatmapScores: tf.Tensor3D;
        offsets: tf.Tensor3D;
        displacementFwd: tf.Tensor3D;
        displacementBwd: tf.Tensor3D;
    };
    estimateSinglePose(input: PosenetInput, imageScaleFactor?: number, flipHorizontal?: boolean, outputStride?: OutputStride): Promise<Pose>;
    estimateMultiplePoses(input: PosenetInput, imageScaleFactor?: number, flipHorizontal?: boolean, outputStride?: OutputStride, maxDetections?: number, scoreThreshold?: number, nmsRadius?: number): Promise<Pose[]>;
    dispose(): void;
}
export declare function load(multiplier?: MobileNetMultiplier): Promise<PoseNet>;
export declare const mobilenetLoader: {
    load: (multiplier: MobileNetMultiplier) => Promise<MobileNet>;
};
