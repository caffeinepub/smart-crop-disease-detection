import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type DiseaseDetection = {
    id : Nat;
    diseaseName : Text;
    affectedCrop : Text;
    severityLevel : Text;
    description : Text;
    recommendedTreatment : Text;
    detectedTimestamp : Time.Time;
  };

  module DiseaseDetection {
    public func compare(d1 : DiseaseDetection, d2 : DiseaseDetection) : Order.Order {
      Nat.compare(d1.id, d2.id);
    };
  };

  type DeviceStatus = {
    batteryPercentage : Nat;
    operationalStatus : Text;
    lastScanTimestamp : Time.Time;
    fieldCoveragePercentage : Nat;
  };

  type CropHealthStats = {
    totalCropsMonitored : Nat;
    healthyCount : Nat;
    infectedCount : Nat;
    lastUpdatedTimestamp : Time.Time;
  };

  type DiseaseLibrary = {
    id : Nat;
    diseaseName : Text;
    affectedCropType : Text;
    symptomsDescription : Text;
    preventionTips : Text;
    treatmentRecommendations : Text;
  };

  let diseaseDetections = List.empty<DiseaseDetection>();
  let diseaseLibrary = Map.empty<Nat, DiseaseLibrary>();

  var deviceStatus : ?DeviceStatus = ?{
    batteryPercentage = 75;
    operationalStatus = "idle";
    lastScanTimestamp = Time.now();
    fieldCoveragePercentage = 80;
  };

  var cropHealthStats : ?CropHealthStats = ?{
    totalCropsMonitored = 1000;
    healthyCount = 850;
    infectedCount = 150;
    lastUpdatedTimestamp = Time.now();
  };

  // Seed data
  public shared ({ caller }) func seedData() : async () {
    // Check if data has already been seeded
    if (diseaseLibrary.isEmpty()) {
      // Add sample disease detections
      let detection1 : DiseaseDetection = {
        id = 1;
        diseaseName = "Leaf Spot";
        affectedCrop = "Tomato";
        severityLevel = "medium";
        description = "Circular brown spots on leaves.";
        recommendedTreatment = "Fungicide spray";
        detectedTimestamp = Time.now();
      };

      let detection2 : DiseaseDetection = {
        id = 2;
        diseaseName = "Root Rot";
        affectedCrop = "Potato";
        severityLevel = "high";
        description = "Wilting leaves, brown roots.";
        recommendedTreatment = "Soil treatment";
        detectedTimestamp = Time.now();
      };

      diseaseDetections.add(detection1);
      diseaseDetections.add(detection2);

      // Add sample disease library entries
      let library1 : DiseaseLibrary = {
        id = 1;
        diseaseName = detection1.diseaseName;
        affectedCropType = detection1.affectedCrop;
        symptomsDescription = detection1.description;
        preventionTips = "Rotate crops; avoid overhead watering.";
        treatmentRecommendations = detection1.recommendedTreatment;
      };

      let library2 : DiseaseLibrary = {
        id = 2;
        diseaseName = detection2.diseaseName;
        affectedCropType = detection2.affectedCrop;
        symptomsDescription = detection2.description;
        preventionTips = "Improve drainage; avoid overwatering.";
        treatmentRecommendations = detection2.recommendedTreatment;
      };

      diseaseLibrary.add(1, library1);
      diseaseLibrary.add(2, library2);
    };
  };

  // Get all disease detections
  public query ({ caller }) func getAllDetections() : async [DiseaseDetection] {
    diseaseDetections.toArray().sort();
  };

  // Get device status
  public query ({ caller }) func getDeviceStatus() : async DeviceStatus {
    switch (deviceStatus) {
      case (null) { Runtime.trap("Device status not available") };
      case (?status) { status };
    };
  };

  // Get crop health stats
  public query ({ caller }) func getCropHealthStats() : async CropHealthStats {
    switch (cropHealthStats) {
      case (null) { Runtime.trap("Crop health stats not available") };
      case (?stats) { stats };
    };
  };

  // Get disease library
  public query ({ caller }) func getDiseaseLibrary() : async [DiseaseLibrary] {
    diseaseLibrary.values().toArray();
  };

  // Update device status
  public shared ({ caller }) func updateDeviceStatus(battery : Nat, status : Text, lastScan : Time.Time, coverage : Nat) : async () {
    deviceStatus := ?{
      batteryPercentage = battery;
      operationalStatus = status;
      lastScanTimestamp = lastScan;
      fieldCoveragePercentage = coverage;
    };
  };

  // Update crop health stats
  public shared ({ caller }) func updateCropHealthStats(totalCrops : Nat, healthy : Nat, infected : Nat, lastUpdated : Time.Time) : async () {
    cropHealthStats := ?{
      totalCropsMonitored = totalCrops;
      healthyCount = healthy;
      infectedCount = infected;
      lastUpdatedTimestamp = lastUpdated;
    };
  };
};
