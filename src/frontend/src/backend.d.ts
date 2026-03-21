import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CropHealthStats {
    totalCropsMonitored: bigint;
    healthyCount: bigint;
    lastUpdatedTimestamp: Time;
    infectedCount: bigint;
}
export interface DiseaseLibrary {
    id: bigint;
    symptomsDescription: string;
    affectedCropType: string;
    diseaseName: string;
    treatmentRecommendations: string;
    preventionTips: string;
}
export type Time = bigint;
export interface DiseaseDetection {
    id: bigint;
    detectedTimestamp: Time;
    recommendedTreatment: string;
    severityLevel: string;
    affectedCrop: string;
    description: string;
    diseaseName: string;
}
export interface DeviceStatus {
    fieldCoveragePercentage: bigint;
    lastScanTimestamp: Time;
    batteryPercentage: bigint;
    operationalStatus: string;
}
export interface backendInterface {
    getAllDetections(): Promise<Array<DiseaseDetection>>;
    getCropHealthStats(): Promise<CropHealthStats>;
    getDeviceStatus(): Promise<DeviceStatus>;
    getDiseaseLibrary(): Promise<Array<DiseaseLibrary>>;
    seedData(): Promise<void>;
    updateCropHealthStats(totalCrops: bigint, healthy: bigint, infected: bigint, lastUpdated: Time): Promise<void>;
    updateDeviceStatus(battery: bigint, status: string, lastScan: Time, coverage: bigint): Promise<void>;
}
