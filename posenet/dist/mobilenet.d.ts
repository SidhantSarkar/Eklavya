import * as tf from '@tensorflow/tfjs';
import { ModelWeights } from './model_weights';
export declare type MobileNetMultiplier = 0.25 | 0.50 | 0.75 | 1.0 | 1.01;
export declare type ConvolutionType = 'conv2d' | 'separableConv';
export declare type ConvolutionDefinition = [ConvolutionType, number];
export declare type OutputStride = 32 | 16 | 8;
export declare function assertValidOutputStride(outputStride: any): void;
export declare function assertValidResolution(resolution: any, outputStride: number): void;
export declare function assertValidScaleFactor(imageScaleFactor: any): void;
export declare const mobileNetArchitectures: {
    [name: string]: ConvolutionDefinition[];
};
export declare class MobileNet {
    private modelWeights;
    private convolutionDefinitions;
    private PREPROCESS_DIVISOR;
    private ONE;
    constructor(modelWeights: ModelWeights, convolutionDefinitions: ConvolutionDefinition[]);
    predict(input: tf.Tensor3D, outputStride: OutputStride): tf.Tensor3D;
    convToOutput(mobileNetOutput: tf.Tensor3D, outputLayerName: string): tf.Tensor3D;
    private conv;
    private separableConv;
    private weights;
    private convBias;
    private depthwiseBias;
    private depthwiseWeights;
    dispose(): void;
}
