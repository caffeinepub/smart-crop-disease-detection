import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CropHealthStats,
  DeviceStatus,
  DiseaseDetection,
  DiseaseLibrary,
} from "../backend";
import { useActor } from "./useActor";

export function useSeedData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      await actor.seedData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useAllDetections() {
  const { actor, isFetching } = useActor();
  return useQuery<DiseaseDetection[]>({
    queryKey: ["detections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDetections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCropHealthStats() {
  const { actor, isFetching } = useActor();
  return useQuery<CropHealthStats>({
    queryKey: ["cropHealth"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getCropHealthStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeviceStatus() {
  const { actor, isFetching } = useActor();
  return useQuery<DeviceStatus>({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getDeviceStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDiseaseLibrary() {
  const { actor, isFetching } = useActor();
  return useQuery<DiseaseLibrary[]>({
    queryKey: ["diseaseLibrary"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDiseaseLibrary();
    },
    enabled: !!actor && !isFetching,
  });
}
