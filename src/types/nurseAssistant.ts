export interface NurseAssistantPatient {
  name?: string;
  blood_group?: string;
  gender?: string;
  year_of_birth?: number;
  date_of_birth?: string;
  deceased_datetime?: string;
  [key: string]: unknown;
}

export interface NurseAssistantEncounter {
  status?: string;
  [key: string]: unknown;
}

export interface NurseAssistantPaginatedData<T = Record<string, any>> {
  count: number;
  results: T[];
}

export interface NurseAssistantProviderProps {
  encounter?: NurseAssistantEncounter;
  patient?: NurseAssistantPatient;
  patientId?: string;
  selectedEncounterId?: string;
  facilityId?: string;
  children: React.ReactNode;
}
